// Run the unbundled desktop app before building any installers.
const {_electron}=require('playwright');
const assert=require('node:assert/strict');
const path=require('node:path');
const fs=require('node:fs');
(async()=>{
  fs.mkdirSync('test-results',{recursive:true});
  const executablePath=require('../desktop/node_modules/electron');
  const args=[path.resolve('desktop/main.js')];
  // Linux-Container ohne GPU brauchen Software-WebGL; Windows- und macOS-Runner rendern selbst.
  if(process.platform==='linux')args.unshift('--no-sandbox','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader');
  const app=await _electron.launch({executablePath,args,timeout:60000});
  try {
    const page=await app.firstWindow();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error'&&/THREE|WebGL|shader|ReferenceError|TypeError/.test(m.text()))errors.push(m.text());});
    await page.waitForFunction(()=>window.terra?.ready,null,{timeout:90000});
    assert.equal(new URL(page.url()).protocol,'terra:');
    assert.equal(new URL(page.url()).hostname,'app');
    assert.ok(await page.evaluate(()=>terra.studio.renderer.info.render.triangles)>1000,'Globe must render');
    assert.ok(!(await page.locator('#offline-save').isVisible()),'Desktop resources are already local');
    // All geology data must load through the packaged app scheme without a server.
    await page.getByRole('button',{name:'Tektonik',exact:true}).click();
    await page.waitForFunction(()=>terra.state.section==='tectonics');
    await page.getByRole('button',{name:'Zeitreise',exact:true}).click();
    await page.locator('#epoch').fill('0');
    await page.waitForFunction(()=>terra.state.age===250&&terra.studio.paleomaps.has(250),null,{timeout:60000});
    // Earthquakes: live USGS feed when online, otherwise the labeled archive shipped with the app.
    await page.getByRole('button',{name:'Erdbeben',exact:true}).click();
    await page.waitForFunction(()=>/Archivstand|erfolgreich/.test(document.querySelector('#event-status')?.textContent||''),null,{timeout:30000});
    assert.ok(await page.locator('.event').count()>0,'Earthquake events must be listed');
    await page.screenshot({path:'test-results/desktop.png',timeout:90000});
    // Kleine Bildschirme (z. B. Windows-Runner mit 1024 × 768) zeigen das Wissenspanel als ausklappbare Leiste.
    const openNotes=async()=>{if(!(await page.locator('[data-info=notes]').isVisible()))await page.locator('#mobile-knowledge').click();await page.locator('[data-info=notes]').click();};
    await page.getByRole('button',{name:'Planet',exact:true}).click();
    await openNotes();await page.locator('#note').fill('Desktop offline smoke test');
    await page.reload();await page.waitForFunction(()=>window.terra?.ready,null,{timeout:90000});
    await openNotes();assert.equal(await page.locator('#note').inputValue(),'Desktop offline smoke test');
    assert.deepEqual(errors,[],'Desktop rendering must have no errors before export');
    const exportPath=path.resolve('test-results/desktop-export.png');
    await app.evaluate(({BrowserWindow},destination)=>{
      globalThis.__exportPromise=new Promise(resolve=>BrowserWindow.getAllWindows()[0].webContents.session.once('will-download',(event,item)=>{
        item.setSavePath(destination);item.once('done',(event,state)=>resolve(state));
      }));
    },exportPath);
    // Ausgeklappte Seitenleiste schließen (Esc), damit die Bildleiste frei ist.
    await page.evaluate(()=>document.activeElement?.blur());await page.keyboard.press('Escape');
    await page.locator('#capture').click();
    const exportState=await app.evaluate(()=>Promise.race([globalThis.__exportPromise,new Promise(resolve=>setTimeout(()=>resolve('timeout'),20000))]));
    assert.equal(exportState,'completed','Electron must save the PNG');
    assert.equal(fs.readFileSync(exportPath).subarray(0,8).toString('hex'),'89504e470d0a1a0a');
    assert.deepEqual(errors,[]);console.log('PASS desktop protocol, geology data, earthquakes, notes and PNG export');
  } finally {await app.close();}
})().catch(e=>{console.error(e);process.exit(1)});
