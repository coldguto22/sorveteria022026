import { useEffect, useState } from 'react'
import './App.css'

type Category = 'Clássicos' | 'Tropicais' | 'Especiais' | 'Veganos'
type Flavor = { name:string; subtitle:string; description:string; price:number; emoji:string; family:'gold'|'green'|'lilac'; badge:string; category:Category; new?:boolean }

const flavors: Flavor[] = [
  { name:'Pistache & Mel', subtitle:'Artesanal · bola dupla', description:'Pistache tostado de verdade, com fio de mel orgânico do Vale do Ribeira. Suave, nobre e irresistível.', price:22, emoji:'🍦', family:'green', badge:'Mais pedido', category:'Especiais' },
  { name:'Baunilha Bourbon', subtitle:'Artesanal · fava inteira', description:'Leite integral da fazenda, creme fresco e fava de baunilha Bourbon. O clássico feito direito.', price:19, emoji:'🍨', family:'gold', badge:'Clássico', category:'Clássicos' },
  { name:'Stracciatella', subtitle:'Creme · lascas de chocolate', description:'Base de creme puro de leite com lascas finas de chocolate amargo 70%. Elegância italiana em cada colher.', price:21, emoji:'🍧', family:'lilac', badge:'Favorito', category:'Clássicos' },
  { name:'Maracujá do Litoral', subtitle:'Frutas frescas · sorbet', description:'Maracujá colhido na temporada, levemente açucarado. Acidez na medida certa, refrescante como a brisa do mar.', price:20, emoji:'🥭', family:'gold', badge:'Temporada', category:'Tropicais', new:true },
  { name:'Açaí & Guaraná', subtitle:'Amazônia · sorbet cremoso', description:'Açaí puro de Belém do Pará com toque de guaraná natural. Energia tropical em versão gelada.', price:24, emoji:'🫐', family:'lilac', badge:'Regional', category:'Tropicais' },
  { name:'Manga Alphonso', subtitle:'Manga importada · sorbet', description:'A rainha das mangas em versão sorbet. Doçura intensa, textura sedosa e cor solar inconfundível.', price:22, emoji:'🥭', family:'gold', badge:'Premium', category:'Tropicais' },
  { name:'Lavanda & Limão Siciliano', subtitle:'Floral · creme suave', description:'Flores de lavanda da Mantiqueira infusionadas no creme, com raspas de limão siciliano. Delicado e surpreendente.', price:26, emoji:'💜', family:'lilac', badge:'Edição Limitada', category:'Especiais', new:true },
  { name:'Matcha Cerimônia', subtitle:'Chá verde · creme japonês', description:'Matcha cerimônia grau A, levemente adoçado com xarope de cana. Umami gelado, meditativo.', price:25, emoji:'🍵', family:'green', badge:'Artesanal', category:'Especiais' },
  { name:'Caramelo Flor de Sal', subtitle:'Caramelo artesanal · flor de sal', description:'Caramelo feito na panela, com manteiga normanda e flor de sal de Mossoró. O contraste que vicia.', price:24, emoji:'🧂', family:'gold', badge:"Chef's Pick", category:'Especiais' },
  { name:'Coco & Limão Kaffir', subtitle:'Leite de coco · 100% vegano', description:'Leite de coco artesanal com folhas de limão kaffir infusionadas. Tropical, leve e 100% plant-based.', price:22, emoji:'🥥', family:'green', badge:'Vegano', category:'Veganos' },
  { name:'Framboesa Selvagem', subtitle:'Sorbet · sem lactose', description:'Framboesas de produção local, sorbet puro sem nenhum laticínio. Vibrantemente vermelho e refrescante.', price:20, emoji:'🍓', family:'lilac', badge:'Vegano', category:'Veganos', new:true },
  { name:'Banana Caramelada', subtitle:'Banana · amêndoas · vegano', description:'Banana nanica caramelada com amêndoas laminadas e canela do Ceilão. Conforto gelado, sem lactose.', price:21, emoji:'🍌', family:'gold', badge:'Vegano', category:'Veganos' },
]
const heroFlavors = [
  ['🍦','Pistache & Mel','Verde suave, nobre','green'], ['💜','Lavanda & Limão','Floral, delicado','lilac'],
  ['🥭','Maracujá do Litoral','Tropical, vibrante','gold'], ['🍵','Matcha Cerimônia','Japonês, meditativo','green'],
  ['🧂','Caramelo Flor de Sal','Intenso, marcante','gold'], ['🍧','Stracciatella','Elegância italiana','lilac'],
]

function Brand(){ return <a className="brand" href="#inicio" aria-label="ArcadeCream, início"><span>ARCADE</span><strong>CREAM</strong><i>🍦</i></a> }

function ProductCard({flavor,onAdd}:{flavor:Flavor;onAdd:(flavor:Flavor)=>void}){
  return <article className={`product-card ${flavor.family}`}><div className="product-art">{flavor.new&&<span className="new-tag">Novo</span>}<span className="product-emoji">{flavor.emoji}</span><div className="dots"><i/><i/></div></div><div className="product-info"><span className="product-badge">{flavor.badge}</span><h3>{flavor.name}</h3><small>{flavor.subtitle}</small><p>{flavor.description}</p><div className="product-footer"><strong>R${flavor.price}</strong><button onClick={()=>onAdd(flavor)}>Adicionar</button></div></div></article>
}

function MenuPage({onAdd}:{onAdd:(flavor:Flavor)=>void}){
  const [search,setSearch]=useState('')
  const [category,setCategory]=useState<'Todos os Sabores'|Category>('Todos os Sabores')
  const visible=flavors.filter(flavor=>(category==='Todos os Sabores'||flavor.category===category)&&flavor.name.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')))
  const categories: Array<'Todos os Sabores'|Category>=['Todos os Sabores','Clássicos','Tropicais','Especiais','Veganos']
  return <main className="menu-page"><section className="menu-hero"><div className="container"><span className="eyebrow menu-label">12 sabores artesanais</span><h1>Nosso Cardápio</h1><label className="search-box"><span>⌕</span><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Buscar sabores..." aria-label="Buscar sabores"/></label></div></section><section className="menu-list"><div className="container"><div className="menu-toolbar"><div className="filter-list">{categories.map(item=><button className={category===item?'selected':''} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><span>{visible.length} {visible.length===1?'sabor':'sabores'}</span></div>{visible.length?<div className="menu-grid">{visible.map(flavor=><ProductCard key={flavor.name} flavor={flavor} onAdd={onAdd}/>)}</div>:<div className="no-results"><span>🍨</span><h2>Nenhum sabor encontrado</h2><p>Tente buscar outro nome ou escolher uma categoria diferente.</p></div>}</div></section></main>
}

function App(){
  const [cart,setCart]=useState<Flavor[]>([])
  const [cartOpen,setCartOpen]=useState(false)
  const [loginOpen,setLoginOpen]=useState(false)
  const [page,setPage]=useState<'home'|'menu'>(()=>window.location.pathname.includes('cardapio')?'menu':'home')
  useEffect(()=>{const onPop=()=>setPage(window.location.pathname.includes('cardapio')?'menu':'home');window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop)},[])
  const navigate=(next:'home'|'menu')=>{window.history.pushState({},'',next==='menu'?'/cardapio':'/');setPage(next);window.scrollTo({top:0,behavior:'smooth'})}
  const add=(flavor:Flavor)=>{ setCart(items=>[...items,flavor]); setCartOpen(true) }
  return <div className="site-shell">
    <header className="header"><nav className="nav container" aria-label="Navegação principal"><span onClick={()=>navigate('home')}><Brand/></span><div className="nav-links"><a className={page==='home'?'active':''} href="/" onClick={e=>{e.preventDefault();navigate('home')}}>Início</a><a className={page==='menu'?'active':''} href="/cardapio" onClick={e=>{e.preventDefault();navigate('menu')}}>Cardápio</a></div><div className="nav-actions"><button className="cart-button" onClick={()=>setCartOpen(true)}>▣ <span>Carrinho</span>{cart.length>0&&<b>{cart.length}</b>}</button><button className="dark-button compact" onClick={()=>setLoginOpen(true)}>Entrar</button></div></nav></header>
    {page==='home'?<main>
      <section className="hero-section" id="inicio"><div className="hero-content container"><div className="hero-copy"><span className="eyebrow gold-label">Litoral Paulista · Temporada 2024/25</span><h1>Sorvete<br/><em>artesanal</em><br/>de verdade.</h1><p>Sabores únicos, ingredientes de origem e a brisa do litoral. Uma experiência que vai muito além de uma casquinha.</p><div className="hero-actions"><a className="dark-button" href="#cardapio">Ver todos os sabores</a><a className="outline-button" href="#destaques">Novidades da temporada</a></div></div><div className="flavor-mosaic">{heroFlavors.map(([emoji,name,subtitle,family])=><article className={`mini-flavor ${family}`} key={name}><span>{emoji}</span><strong>{name}</strong><small>{subtitle}</small></article>)}</div></div></section>
      <section className="values-section"><div className="values container"><article><span>🌿</span><h3>Ingredientes de origem</h3><p>Frutas da estação, produtores locais do litoral e do interior paulista.</p></article><article><span>🥛</span><h3>Sem conservantes</h3><p>Produção diária, sem aditivos artificiais. Sorvete como era para ser.</p></article><article><span>🌊</span><h3>À beira do mar</h3><p>Nossa sorveteria na orla de Santos, Guarujá, Ubatuba e São Sebastião.</p></article></div></section>
      <section className="featured-section" id="cardapio"><div className="container"><div className="section-heading"><div><span className="eyebrow lilac-label">Selecionados pela casa</span><h2 id="destaques">Destaques da temporada</h2></div><a className="outline-button small" href="/cardapio" onClick={e=>{e.preventDefault();navigate('menu')}}>Ver cardápio completo →</a></div><div className="product-grid">{flavors.filter(flavor=>['Pistache & Mel','Baunilha Bourbon','Maracujá do Litoral','Lavanda & Limão Siciliano','Matcha Cerimônia'].includes(flavor.name)).map(flavor=><ProductCard key={flavor.name} flavor={flavor} onAdd={add}/>)}</div></div></section>
      <section className="families-section" id="familias"><div className="container"><div className="center-heading"><h2>Três famílias de sabor</h2><p>Cada cor conta uma história diferente</p></div><div className="family-grid"><article className="family gold"><h3><i/>Dourados</h3><p>Cítricos, caramelos e sabores que trazem energia. Maracujá, baunilha bourbon, caramelo.</p><ul><li>🍦 Baunilha Bourbon</li><li>🍦 Maracujá do Litoral</li><li>🍦 Caramelo Flor de Sal</li></ul></article><article className="family green"><h3><i/>Verdes</h3><p>Frescos, herbais e naturais. Pistache, matcha, coco e folhas da horta.</p><ul><li>🍦 Pistache & Mel</li><li>🍦 Matcha Cerimônia</li><li>🍦 Coco & Limão Kaffir</li></ul></article><article className="family lilac"><h3><i/>Lilases</h3><p>Florais, delicados e surpreendentes. Lavanda, açaí, framboesa e stracciatella.</p><ul><li>🍦 Lavanda & Limão Siciliano</li><li>🍦 Stracciatella</li><li>🍦 Framboesa Selvagem</li></ul></article></div></div></section>
      <section className="cta-section"><span>🍧</span><h2>Sabores que <em>ficam na memória</em></h2><p>Peça pelo nosso cardápio online e retire na loja mais próxima de você no litoral.</p><a className="dark-button lilac-text" href="#cardapio">Montar meu pedido</a></section>
    </main>:<MenuPage onAdd={add}/>}
    <footer><div className="container footer-content"><Brand/><p>Santos · Guarujá · Ubatuba · São Sebastião · Temporada 2024/25</p><p>© 2025 ArcadeCream</p></div></footer>
    {cartOpen&&<div className="overlay" onMouseDown={()=>setCartOpen(false)}><aside className="drawer" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setCartOpen(false)}>×</button><h2>Seu carrinho</h2>{cart.length===0?<p className="empty">Sua próxima memória gelada começa aqui.</p>:<>{cart.map((item,index)=><div className="cart-item" key={`${item.name}-${index}`}><span>{item.emoji}</span><div><strong>{item.name}</strong><small>R${item.price}</small></div><button onClick={()=>setCart(items=>items.filter((_,i)=>i!==index))}>×</button></div>)}<div className="cart-total"><span>Total</span><strong>R${cart.reduce((sum,item)=>sum+item.price,0)}</strong></div><button className="dark-button checkout">Finalizar pedido</button></>}</aside></div>}
    {loginOpen&&<div className="overlay modal-overlay" onMouseDown={()=>setLoginOpen(false)}><div className="login-modal" onMouseDown={e=>e.stopPropagation()}><button className="close" onClick={()=>setLoginOpen(false)}>×</button><span className="login-icon">🍦</span><h2>Que bom ter você aqui</h2><p>Entre para acompanhar seus pedidos e sabores favoritos.</p><label>E-mail<input type="email" placeholder="voce@email.com"/></label><label>Senha<input type="password" placeholder="••••••••"/></label><button className="dark-button checkout">Entrar</button></div></div>}
  </div>
}
export default App
