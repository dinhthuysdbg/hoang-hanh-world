import { useMemo, useState } from 'react'
import './App.css'

type Question = { q: string; answers: string[]; result: string[] }
const quiz: Question[] = [
  { q: 'Một buổi hẹn lý tưởng của bạn là…', answers: ['Đi dạo và ăn món ngon', 'Ở nhà xem phim', 'Một chuyến đi bất ngờ', 'Ngồi nói chuyện thật lâu'], result: ['Bạn trân trọng những điều giản dị.', 'Bạn thích cảm giác bình yên và thân thuộc.', 'Bạn luôn tò mò và yêu trải nghiệm mới.', 'Bạn coi sự kết nối là điều quan trọng nhất.'] },
  { q: 'Khi nhớ một người, bạn thường…', answers: ['Nhắn tin ngay', 'Âm thầm xem lại ảnh', 'Tìm một món quà nhỏ', 'Chờ dịp gặp để kể'], result: ['Bạn chân thành và chủ động.', 'Bạn sống tình cảm, lưu giữ kỷ niệm.', 'Bạn thể hiện tình cảm bằng hành động.', 'Bạn thích những khoảnh khắc thật sự bên nhau.'] },
  { q: 'Điều khiến bạn vui nhất là…', answers: ['Một lời hỏi han', 'Được lắng nghe', 'Một bất ngờ nhỏ', 'Cùng nhau làm việc thường ngày'], result: ['Bạn để ý những quan tâm nhỏ.', 'Bạn cần sự thấu hiểu và sẻ chia.', 'Bạn yêu sự tinh tế và bất ngờ.', 'Bạn tìm thấy hạnh phúc trong đồng hành.'] },
]
const games = [
  { icon: '✦', name: 'Quiz phong cách yêu', desc: 'Khám phá cách bạn trao và nhận yêu thương.', tag: '3 câu hỏi', type: 'quiz' },
  { icon: '♡', name: 'Bạn hiểu người ấy?', desc: 'Những tình huống vui để thử độ tinh ý.', tag: 'Sắp ra mắt', type: 'soon' },
  { icon: '✿', name: 'Vòng quay bất ngờ', desc: 'Nhận một thử thách nhỏ ngẫu nhiên.', tag: 'Sắp ra mắt', type: 'soon' },
  { icon: '☼', name: 'Thử thách 7 ngày', desc: 'Mỗi ngày một điều dễ thương để làm.', tag: 'Sắp ra mắt', type: 'soon' },
]
const PASSCODE = 'doi-mat-khau-cua-ban' // Thay bằng mật khẩu riêng trước khi phát hành nội dung riêng tư.

function App() {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(-1)
  const [answers, setAnswers] = useState<number[]>([])
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const score = useMemo(() => answers.reduce((a,b)=>a+b,0), [answers])
  const startQuiz = () => { setActive(true); setStep(0); setAnswers([]) }
  const answer = (n:number) => { setAnswers(v=>[...v,n]); setStep(v=>v+1) }
  const unlock = (e:React.FormEvent) => { e.preventDefault(); if(pass===PASSCODE){setUnlocked(true);setError('')}else setError('Mật khẩu chưa đúng. Thử lại nhé.')}
  return <main className="site-shell">
    <header className="topbar"><a className="wordmark" href="#top"><span className="logo">h<span>♡</span></span><span>THE LITTLE LOVE CLUB<small>A playful place for lovely souls</small></span></a><nav><a href="#games">Trò chơi</a><a href="#about">Về nơi này</a></nav><a className="private-link" href="#private">Khu vực của chúng mình <span>↗</span></a></header>
    <section className="hero" id="top"><div className="hero-copy"><div className="eyebrow"><i/> A LITTLE PLAYGROUND FOR THE HEART</div><h1>Một chút vui,<br/><em>một chút yêu.</em></h1><p>Ghé chơi vài câu quiz, khám phá những điều dễ thương và để hôm nay có thêm một lý do mỉm cười.</p><div className="hero-buttons"><button className="btn-primary" onClick={startQuiz}>Chơi quiz ngay <span>→</span></button><a className="btn-quiet" href="#games">Khám phá trò chơi ↓</a></div><div className="hero-meta"><span>♡ Không cần đăng ký</span><span>✦ Chơi miễn phí</span></div></div><div className="hero-visual"><div className="blob blob-back"/><div className="quiz-ticket"><span className="ticket-top">TODAY'S LITTLE QUESTION</span><div className="ticket-heart">♡</div><strong>How lovely<br/>is your heart?</strong><span className="ticket-bottom">TAKE A MOMENT · HAVE SOME FUN</span></div><span className="sticker sticker-one">be kind ✿</span><span className="sticker sticker-two">you are lovely!</span><span className="visual-star">✳</span></div><div className="hero-foot"><span>SCROLL TO PLAY</span><span>✦</span><span>01 / 04</span></div></section>
    <section className="games-section" id="games"><div className="section-head"><div><span className="kicker">THE PLAYGROUND</span><h2>Chọn một trò <em>để vui.</em></h2><p>Những trò chơi nhỏ, dành cho những phút giây nhẹ nhàng.</p></div><span className="head-doodle">✿</span></div><div className="game-grid">{games.map((g,i)=><article className={'game-card game-'+i} key={g.name}><div className="game-card-top"><span className="game-icon">{g.icon}</span><span className="game-tag">{g.tag}</span></div><div><h3>{g.name}</h3><p>{g.desc}</p></div><button onClick={g.type==='quiz'?startQuiz:()=>{}} className="game-action">{g.type==='quiz'?'Chơi ngay ↗':'Sắp có mặt ♡'}</button></article>)}</div></section>
    <section className="note-section" id="about"><div className="note-inner"><span className="note-spark">✧</span><span className="kicker">A SMALL REMINDER</span><h2>Những điều đẹp đẽ<br/>thường bắt đầu từ <em>một nụ cười.</em></h2><p>Cứ thong thả khám phá. Biết đâu bạn sẽ tìm thấy một điều thật vui ở đây.</p><span className="note-sign">with a little love ♡</span></div></section>
    <section className="private-section" id="private"><div className="private-card"><div className="lock-art"><span>♡</span><i>✦</i></div><div className="private-copy"><span className="kicker">A WORLD JUST FOR TWO</span><h2>Chốn riêng<br/><em>của chúng mình.</em></h2><p>Một nơi cất giữ câu chuyện, những bức ảnh và ký ức chỉ hai đứa mình được xem.</p><button className="btn-primary" onClick={()=>document.getElementById('private-form')?.scrollIntoView({behavior:'smooth'})}>Đi đến cánh cửa riêng ↗</button></div><form id="private-form" className="unlock-form" onSubmit={unlock}><label htmlFor="passcode">Mật khẩu riêng</label><div className="input-wrap"><input id="passcode" type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Nhập mật khẩu của hai bạn" autoComplete="current-password"/><button type="submit" aria-label="Mở khóa">→</button></div>{error&&<p className="error">{error}</p>}{unlocked&&<div className="unlocked"><b>♡ Đã mở cánh cửa!</b><p>Khu vực riêng tư đang ở chế độ bản xem trước. Cần cấu hình xác thực máy chủ trước khi đưa ảnh và dữ liệu thật vào đây.</p></div>}<small>Chỉ dành cho Hoàng Hạnh & người thương.</small></form></div></section>
    <footer><a className="wordmark" href="#top"><span className="logo">h<span>♡</span></span><span>THE LITTLE LOVE CLUB<small>Made with a little love</small></span></a><span>© 2026 · A happy little corner</span><a href="#top">Lên đầu trang ↑</a></footer>
    {active&&<div className="quiz-overlay" role="dialog" aria-modal="true" aria-label="Quiz phong cách yêu"><div className="quiz-modal"><button className="close" onClick={()=>setActive(false)}>×</button><span className="kicker">LOVE STYLE QUIZ · {Math.min(step+1,3)}/3</span>{step<3?<><div className="progress"><i style={{width:(step/3*100)+'%'}}/></div><h2>{quiz[step].q}</h2><div className="answer-list">{quiz[step].answers.map((a,i)=><button key={a} onClick={()=>answer(i)}><span>{String.fromCharCode(65+i)}</span>{a}<b>→</b></button>)}</div></>:<div className="quiz-result"><span className="result-heart">♡</span><h2>Trái tim bạn có một nét rất riêng.</h2><p>{quiz[Math.min(2,Math.floor(score/4))].result[answers[Math.min(2,Math.floor(score/4))]??0]}</p><button className="btn-primary" onClick={()=>{setStep(0);setAnswers([])}}>Chơi lại ↻</button></div>}<div className="quiz-modal-foot">A LITTLE FUN FOR YOUR DAY ♡</div></div></div>}
  </main>
}
export default App
