const http=require('http');
const fs=require('fs');
const path=require('path');
const {spawn}=require('child_process');
const ROOT=__dirname;
const START=8088;
const MAX=50;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.glb':'model/gltf-binary','.gltf':'model/gltf+json'};
function openBrowser(url){
  if(process.env.TECHFORGE_NO_BROWSER==='1') return;
  const cmd=process.platform==='win32'?'cmd':process.platform==='darwin'?'open':'xdg-open';
  const args=process.platform==='win32'?['/c','start','',url]:[url];
  try{const p=spawn(cmd,args,{detached:true,stdio:'ignore'});p.unref();}catch(e){}
}
function handler(req,res){
  const raw=decodeURIComponent((req.url||'/').split('?')[0]);
  const rel=raw==='/'?'index.html':raw.replace(/^\/+/, '');
  const file=path.normalize(path.join(ROOT,rel));
  if(!file.startsWith(ROOT)){res.writeHead(403);return res.end('Acesso negado');}
  fs.readFile(file,(err,data)=>{
    if(err){res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});return res.end('Arquivo não encontrado');}
    res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  });
}
function tryPort(port,attempt){
  const server=http.createServer(handler);
  server.once('error',err=>{
    if(err.code==='EADDRINUSE'&&attempt<MAX){console.log(`Porta ${port} ocupada. Tentando ${port+1}...`);tryPort(port+1,attempt+1);}else{console.error('Erro ao iniciar:',err.message);process.exit(1);}
  });
  server.listen(port,'127.0.0.1',()=>{
    const url=`http://127.0.0.1:${port}/`;
    console.log('==================================================');
    console.log(' TechForge 3D iniciado com sucesso');
    console.log(' Endereço: '+url);
    console.log(' Mantenha esta janela aberta durante o jogo.');
    console.log(' Para encerrar: Ctrl+C');
    console.log('==================================================');
    openBrowser(url);
  });
}
tryPort(START,0);
