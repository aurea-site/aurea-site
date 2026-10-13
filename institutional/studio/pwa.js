const installButton=document.getElementById('installApp');let installPrompt;
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone;
function updateInstall(){installButton.hidden=standalone()}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;updateInstall()});
window.addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true});
installButton.addEventListener('click',async()=>{if(installPrompt){await installPrompt.prompt();const choice=await installPrompt.userChoice;if(choice.outcome==='accepted')installButton.hidden=true;installPrompt=null;return}alert(/iPhone|iPad|iPod/.test(navigator.userAgent)?'No Safari: toque em Compartilhar e depois em Adicionar à Tela de Início.':'No Chrome: abra o menu ⋮ e toque em Instalar aplicativo ou Adicionar à tela inicial. Se a opção ainda não aparecer, recarregue a página.')});
updateInstall();
if('serviceWorker' in navigator)navigator.serviceWorker.register('/studio/sw.js',{scope:'/studio'}).catch(()=>{});
window.addEventListener('offline',()=>{document.getElementById('status').textContent='Sem conexão. Aguarde a internet voltar para salvar ou publicar.'});
