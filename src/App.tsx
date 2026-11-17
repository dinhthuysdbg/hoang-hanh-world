import { useMemo, useState } from 'react'
import './App.css'

type Game = { id: number; title: string; description: string; category: string; players: string; duration: string; tone: string; questions: string[]; options: string[][] }
const games: Game[] = [
  { id: 1, title: 'Ngôn ngữ yêu thương', description: 'Khám phá cách bạn trao đi và đón nhận yêu thương.', category: 'Tình yêu', players: '2–8 người', duration: '5 phút', tone: 'rose', questions: ['Một ngày rảnh, bạn muốn làm gì nhất?', 'Điều gì khiến bạn cảm thấy được quan tâm?', 'Bạn thích nhận món quà nào?'], options: [['Đi đâu đó thật xa','Ở nhà nghỉ ngơi','Khám phá một nơi mới','Ở cạnh người thương'],['Một lời hỏi han','Một cái ôm','Được lắng nghe','Một hành động nhỏ'],['Một chuyến đi','Món quà bất ngờ','Bữa ăn tự nấu','Album kỷ niệm']] },
  { id: 2, title: 'Bạn hiểu người ấy đến đâu?', description: 'Thử xem bạn nhớ được bao nhiêu điều nhỏ bé về nhau.', category: 'Tình yêu', players: '2–6 người', duration: '7 phút', tone: 'lilac', questions: ['Người ấy thích buổi hẹn nào?', 'Món quà nào sẽ làm người ấy vui?', 'Một ngày lý tưởng của người ấy là?'], options: [['Đi xem phim','Ăn tối','Đi dạo','Ở nhà'],['Hoa','Sách','Đồ công nghệ','Một bức thư'],['Nghỉ ngơi','Đi chơi','Gặp bạn bè','Ở bên gia đình']] },
  { id: 3, title: 'Đố vui kiến thức tổng hợp', description: '10 câu hỏi nhanh để khởi động trí tò mò.', category: 'Kiến thức', players: '1–20 người', duration: '4 phút', tone: 'blue', questions: ['Hành tinh nào gần Mặt Trời nhất?', 'Đại dương lớn nhất là?', 'Một năm thường có bao nhiêu ngày?'], options: [['Sao Kim','Sao Thủy','Trái Đất','Sao Hỏa'],['Đại Tây Dương','Ấn Độ Dương','Thái Bình Dương','Bắc Băng Dương'],['364','365','366','360']] },
  { id: 4, title: 'Thử thách trí nhớ', description: 'Quan sát, ghi nhớ và chọn đáp án thật nhanh.', category: 'Trí tuệ', players: '1–10 người', duration: '3 phút', tone: 'yellow', questions: ['Bạn thường ghi nhớ tốt nhất điều gì?', 'Khi học điều mới, bạn thích cách nào?', 'Bạn chọn thử thách nào?'], options: [['Hình ảnh','Con số','Âm thanh','Câu chuyện'],['Thực hành','Đọc hiểu','Nghe giảng','Thảo luận'],['Câu đố logic','Tìm điểm khác nhau','Ghi nhớ hình','Tính nhẩm']] },
  { id: 5, title: 'Một ngày tích cực', description: 'Những câu hỏi nhỏ giúp cả nhóm bắt đầu ngày mới.', category: 'Phong cách sống', players: '2–12 người', duration: '5 phút', tone: 'green', questions: ['Điều gì làm bạn vui hôm nay?', 'Bạn muốn dành thời gian cho việc gì?', 'Năng lượng của bạn lúc này?'], options: [['Một cuộc gọi','Một tách cà phê','Một lời khen','Một kế hoạch'],['Gia đình','Bạn bè','Bản thân','Công việc'],['Tràn đầy','Bình thường','Cần nghỉ ngơi','Sẵn sàng bứt phá']] },
  { id: 6, title: 'Quiz dành cho hội bạn', description: 'Vừa chơi vừa khám phá những điều bất ngờ về hội bạn.', category: 'Giải trí', players: '3–16 người', duration: '6 phút', tone: 'orange', questions: ['Ai thường đến muộn nhất?', 'Cả nhóm thích hoạt động nào?', 'Nếu đi chơi ngay, bạn chọn đâu?'], options: [['Tôi','Bạn thân','Người tổ chức','Không ai cả'],['Ăn uống','Du lịch','Chơi game','Xem phim'],['Biển','Núi','Thành phố','Ở nhà']] },
]
const categories = ['Tất cả','Tình yêu','Kiến thức','Trí tuệ','Phong cách sống','Giải trí']
function App() {
  const [query,setQuery] = useState('')
  const [category,setCategory] = useState('Tất cả')
  const [joinCode,setJoinCode] = useState('')
  const [notice,setNotice] = useState('')
  const [active,setActive] = useState<Game|null>(null)
  const [step,setStep] = useState(0)
  const [showAll,setShowAll] = useState(false)
  const filtered = useMemo(()=>games.filter(g=>(category==='Tất cả'||g.category===category)&&(`${g.title} ${g.description}`.toLowerCase().includes(query.toLowerCase()))),[category,query])
  const start=(game:Game)=>{setActive(game);setStep(0)}
  const finish=active && step>=active.questions.length
  const join=()=>{setNotice(joinCode.trim()?'Không tìm thấy phòng công khai với mã này. Hãy kiểm tra lại mã tham gia.':'Bạn hãy nhập mã tham gia của một trò chơi công khai.')}
  return <main className="app-shell">
    <header className="topbar">
      <a className="logo" href="#home"><span className="logo-icon">✳</span><span>play<span className="logo-accent">room</span><small>LEARN · PLAY · CONNECT</small></span></a>
      <nav className="main-nav"><a className="nav-active" href="#discover">Khám phá</a><a href="#categories">Danh mục</a><a href="#how">Cách chơi</a></nav>
      <div className="top-actions"><a className="text-button" href="#how">Dành cho người tổ chức</a><a className="login-button" href="#join">Tham gia trò chơi <span>↗</span></a></div>
    </header>

    <section className="welcome-hero" id="home">
      <div className="hero-copy">
        <div className="eyebrow"><span className="live-dot"/> KHÔNG GIAN HỌC HỎI & GIẢI TRÍ</div>
        <h1>Mỗi lần chơi,<br/><em>thêm một điều hay.</em></h1>
        <p>Khám phá những bộ câu hỏi thú vị, thử thách kiến thức và kết nối với mọi người qua những trò chơi tương tác.</p>
        <div className="hero-cta-row"><a className="primary-button" href="#discover">Khám phá trò chơi <span>→</span></a><a className="secondary-link" href="#how">Tìm hiểu cách chơi <span>↗</span></a></div>
        <div className="hero-proof"><span className="avatar-stack"><i>H</i><i>♡</i><i>友</i></span><span>Chơi vui cùng bạn bè, gia đình và người thương</span></div>
      </div>
      <div className="hero-art">
        <div className="art-card card-back"><span className="mini-label">QUICK QUIZ</span><b>03:25</b><div className="fake-bars"><i/><i/><i/><i/></div></div>
        <div className="art-card card-main"><div className="art-card-top"><span>✦ DAILY CHALLENGE</span><span>01 / 10</span></div><div className="art-question">Bạn đã sẵn sàng<br/>thử thách bản thân?</div><div className="art-answer answer-one"><i>A</i> Bắt đầu thôi!</div><div className="art-answer"><i>B</i> Để xem nào…</div><div className="art-answer"><i>C</i> Chơi cùng bạn bè</div><div className="art-bottom"><span>✳ PLAYROOM</span><span>♡</span></div></div>
        <div className="floating-note note-top">✨ Học mà chơi</div><div className="floating-note note-bottom">🎯 Thử thách mỗi ngày</div><div className="art-orb orb-a"/><div className="art-orb orb-b"/>
      </div>
      <div className="hero-scroll">SCROLL TO EXPLORE <span>↓</span></div>
    </section>

    <section className="join-band" id="join">
      <div className="join-intro"><span className="join-icon">⌁</span><div><b>Đã có mã tham gia?</b><small>Nhập mã phòng công khai để vào chơi cùng mọi người.</small></div></div>
      <div className="join-form"><input value={joinCode} onChange={e=>{setJoinCode(e.target.value);setNotice('')}} onKeyDown={e=>e.key==='Enter'&&join()} placeholder="Nhập mã tham gia" aria-label="Mã tham gia trò chơi công khai"/><button onClick={join}>Tham gia <span>→</span></button></div>
      {notice&&<div className="join-notice" role="status">{notice}</div>}
    </section>

    <section className="discover-section" id="discover">
      <div className="section-title"><div><span className="eyebrow">THE PLAYROOM · 01</span><h2>Khám phá <em>trò chơi</em></h2><p>Chọn một chủ đề và bắt đầu hành trình khám phá của bạn.</p></div><div className="section-side-note">CHỌN TRÒ CHƠI PHÙ HỢP <span>✳</span></div></div>
      <div className="filter-row" id="categories"><div className="category-tabs">{categories.map(c=><button key={c} className={category===c?'selected':''} onClick={()=>setCategory(c)}>{c}</button>)}</div><label className="search-box"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm trò chơi..."/></label></div>
      <div className="game-grid">{(showAll?filtered:filtered.slice(0,6)).map((g,index)=><article className="game-card" key={g.id}><div className={`game-art ${g.tone}`}><span className="game-category">{g.category}</span><span className="game-art-number">{String(g.id).padStart(2,'0')}</span><div className="game-art-symbol">{['♡','✦','◉','⌘','☼','✳'][g.id-1]}</div><span className="game-art-caption">PLAYROOM ORIGINAL</span></div><div className="game-card-body"><h3>{g.title}</h3><p>{g.description}</p><div className="game-meta"><span>♧ {g.players}</span><span>◷ {g.duration}</span></div><button className="play-button" onClick={()=>start(g)}>Chơi thử <span>→</span></button></div></article>)}</div>
      {filtered.length===0&&<div className="empty-state">Không tìm thấy trò chơi phù hợp. Thử từ khóa khác nhé!</div>}
      {filtered.length>3&&<div className="view-all-wrap"><button className="view-all" onClick={()=>setShowAll(!showAll)}>{showAll?'Thu gọn':'Xem tất cả trò chơi'} <span>{showAll?'↑':'→'}</span></button></div>}
    </section>

    <section className="feature-strip"><div className="feature-heading"><span className="eyebrow">WHY PLAYROOM?</span><h2>Không chỉ là<br/><em>một trò chơi.</em></h2></div><div className="feature-item"><span>01</span><b>Dễ bắt đầu</b><p>Chọn trò chơi yêu thích và khám phá ngay, không cần thao tác phức tạp.</p></div><div className="feature-item"><span>02</span><b>Chủ đề đa dạng</b><p>Từ kiến thức, trí tuệ đến tình yêu và những phút giây giải trí.</p></div><div className="feature-item"><span>03</span><b>Kết nối mọi người</b><p>Cùng chơi, cùng trả lời và tạo nên những khoảnh khắc vui vẻ.</p></div></section>

    <section className="how-section" id="how"><div className="how-heading"><span className="eyebrow">START IN THREE STEPS · 03</span><h2>Bắt đầu thật <em>đơn giản.</em></h2></div><div className="steps"><div><span>01</span><b>Chọn trò chơi</b><p>Khám phá thư viện và chọn chủ đề bạn yêu thích.</p></div><div><span>02</span><b>Tham gia</b><p>Chơi thử trực tiếp hoặc nhập mã phòng công khai.</p></div><div><span>03</span><b>Vui hết mình</b><p>Trả lời câu hỏi, khám phá kết quả và chia sẻ niềm vui.</p></div></div></section>
    <footer className="site-footer"><a className="logo" href="#home"><span className="logo-icon">✳</span><span>play<span className="logo-accent">room</span><small>LEARN · PLAY · CONNECT</small></span></a><span>Made for curious minds, with a little joy. ♡</span><a href="#home">Về đầu trang ↑</a></footer>

    {active&&<div className="quiz-overlay" role="dialog" aria-modal="true" aria-label={active.title}><div className="quiz-panel"><button className="quiz-close" onClick={()=>setActive(null)} aria-label="Đóng">×</button><span className="eyebrow">PLAYROOM ORIGINAL · {active.category.toUpperCase()}</span><div className="quiz-progress"><i style={{width:`${Math.min(step,active.questions.length)/active.questions.length*100}%`}}/></div>{!finish?<><small className="quiz-counter">CÂU HỎI {step+1} / {active.questions.length}</small><h2>{active.questions[step]}</h2><div className="quiz-answers">{active.options[step].map(option=><button key={option} onClick={()=>setStep(s=>s+1)}><span>{String.fromCharCode(65+i)}</span>{option}<b>→</b></button>)}</div></>:<div className="quiz-result"><span>✳</span><h2>Hoàn thành thử thách!</h2><p>Bạn đã hoàn thành {active.title}. Cảm ơn bạn đã tham gia chơi.</p><button className="primary-button" onClick={()=>setStep(0)}>Chơi lại <span>↻</span></button><button className="secondary-link" onClick={()=>setActive(null)}>Quay lại thư viện</button></div>}<div className="quiz-foot">PLAYROOM <span>♡</span></div></div></div>}
  </main>
}
export default App
