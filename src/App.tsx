import { useMemo, useState } from 'react'
import './App.css'

type IconName = 'heart' | 'sparkles' | 'arrow' | 'lock' | 'gift' | 'ticket' | 'sun' | 'close'
function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    heart: <path d="M20.8 8.8c0 5.1-8.8 10.1-8.8 10.1S3.2 13.9 3.2 8.8A4.6 4.6 0 0 1 12 6.5a4.6 4.6 0 0 1 8.8 2.3Z"/>,
    sparkles: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z"/></>,
    arrow: <><path d="M4 12h15m-6-6 6 6-6 6"/></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 4v3"/></>,
    gift: <><path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15"/><path d="M12 6H8.5a2.5 2.5 0 1 1 2.2-3.7L12 6Zm0 0h3.5a2.5 2.5 0 1 0-2.2-3.7L12 6Z"/></>,
    ticket: <><path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4V6Z"/><path d="M12 7v2m0 3v2m0 3v1"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    close: <path d="m6 6 12 12M18 6 6 18"/>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
const questions = [
  { title: 'Một ngày rảnh rỗi, bạn muốn…', options: ['Đi đâu đó thật xa', 'Ở nhà, ăn ngon và xem phim', 'Dạo phố, khám phá quán mới', 'Chỉ cần ở cạnh người mình thương'], results: ['Bạn yêu tự do và những trải nghiệm mới.', 'Bạn tìm thấy hạnh phúc trong sự bình yên.', 'Bạn có tâm hồn tò mò và đầy năng lượng.', 'Với bạn, đúng người quan trọng hơn đúng nơi.'] },
  { title: 'Khi muốn nói lời yêu thương, bạn thường…', options: ['Nói thẳng bằng lời', 'Làm một điều nhỏ bất ngờ', 'Dành thời gian ở bên nhau', 'Nhớ những điều người ấy thích'], results: ['Bạn chân thành và không ngại bày tỏ.', 'Bạn tinh tế, thích yêu bằng hành động.', 'Bạn coi thời gian là món quà quý nhất.', 'Bạn yêu bằng sự quan tâm rất riêng.'] },
  { title: 'Điều làm bạn thấy được yêu nhất là…', options: ['Một cái ôm thật lâu', 'Một tin nhắn hỏi han', 'Được lắng nghe và thấu hiểu', 'Cùng nhau làm những việc bình thường'], results: ['Bạn trân trọng sự gần gũi và ấm áp.', 'Bạn để ý những quan tâm nhỏ mỗi ngày.', 'Bạn cần một kết nối sâu sắc.', 'Bạn tin hạnh phúc nằm trong đồng hành.'] },
  { title: 'Nếu chọn một món quà, bạn sẽ chọn…', options: ['Một chuyến đi', 'Một món đồ được chọn kỹ', 'Một bữa tối tự tay chuẩn bị', 'Một cuốn album kỷ niệm'], results: ['Bạn thích lưu giữ những trải nghiệm.', 'Bạn trân trọng sự tinh tế và để tâm.', 'Bạn trao yêu thương qua chăm sóc.', 'Bạn là người sống tình cảm và hoài niệm.'] },
]
const games = [
  { icon: 'sparkles' as const, number: '01', title: 'Khám phá ngôn ngữ yêu', text: 'Bạn thường trao và nhận yêu thương theo cách nào?', label: '4 câu hỏi', action: 'Chơi ngay', playable: true },
  { icon: 'heart' as const, number: '02', title: 'Bạn hiểu người ấy đến đâu?', text: 'Một bài trắc nghiệm vui về sự tinh ý trong tình yêu.', label: 'Đang hoàn thiện', action: 'Sắp ra mắt', playable: false },
  { icon: 'ticket' as const, number: '03', title: 'Chiếc vé bất ngờ', text: 'Mở một gợi ý hẹn hò ngẫu nhiên cho hôm nay.', label: 'Đang hoàn thiện', action: 'Sắp ra mắt', playable: false },
  { icon: 'gift' as const, number: '04', title: '7 ngày dịu dàng', text: 'Bảy thử thách nhỏ để ngày nào cũng có điều vui.', label: 'Đang hoàn thiện', action: 'Sắp ra mắt', playable: false },
]
function App() {
  const [quizOpen, setQuizOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const score = useMemo(() => answers.reduce((sum, value) => sum + value, 0), [answers])
  const finished = answers.length === questions.length
  const startQuiz = () => { setStep(0); setAnswers([]); setQuizOpen(true) }
  const pick = (value: number) => { setAnswers(current => [...current, value]); setStep(current => current + 1) }
  const result = questions[score % questions.length].results[answers[score % questions.length] ?? 0]
  const unlock = (event: React.FormEvent) => { event.preventDefault(); setError('Đăng nhập riêng tư chưa được cấu hình. Không nhập mật khẩu thật ở bản xem trước này.') }
  return <main className="page" id="top">
    <header className="header">
      <a className="brand" href="#top" aria-label="The Little Love Club"><span className="brand-mark"><Icon name="heart" size={19}/></span><span className="brand-name">THE LITTLE LOVE CLUB<span>A LITTLE CORNER OF JOY</span></span></a>
      <nav className="navigation"><a href="#play">Trò chơi</a><a href="#story">Tinh thần</a><a href="#our-place">Góc riêng</a></nav>
      <a className="header-cta" href="#our-place">Dành cho hai người <Icon name="arrow" size={15}/></a>
    </header>

    <section className="hero">
      <div className="hero-grain"/>
      <div className="hero-content">
        <div className="overline"><span/> A LITTLE PLAYGROUND FOR THE HEART</div>
        <h1>Yêu đời một chút.<br/><em>Thương nhau nhiều hơn.</em></h1>
        <p className="hero-description">Một góc nhỏ để chơi vài trò vui, khám phá những điều đáng yêu và giữ lại chút dịu dàng giữa những ngày bận rộn.</p>
        <div className="hero-actions"><button className="button button-dark" onClick={startQuiz}>Khám phá ngay <Icon name="arrow" size={16}/></button><a className="text-link" href="#play">Xem các trò chơi <span>↓</span></a></div>
        <div className="hero-caption"><span><Icon name="sun" size={15}/> Một chút vui mỗi ngày</span><span>EST. WITH LOVE · 2026</span></div>
      </div>
      <div className="hero-art" aria-label="Minh họa nghệ thuật tình yêu">
        <div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/>
        <div className="art-disc"><div className="disc-inner"><span className="disc-small">A NOTE TO THE HEART</span><Icon name="heart" size={60}/><strong>love<br/><i>is a little</i><br/>everyday thing.</strong><span className="disc-bottom">TAKE IT SLOW · FEEL IT ALL</span></div></div>
        <span className="art-label label-top">made of little moments</span><span className="art-label label-bottom">♡  be here, be loved</span><span className="art-spark"><Icon name="sparkles" size={28}/></span>
      </div>
      <div className="hero-bottom"><span>SCROLL TO DISCOVER</span><span className="bottom-line"/><span>01 — 04</span></div>
    </section>

    <section className="intro-strip"><span>FOR THE CURIOUS HEARTS</span><p>Không cần lý do đặc biệt để có một ngày thật dễ thương.</p><Icon name="sparkles" size={19}/></section>

    <section className="play-section section-wrap" id="play">
      <div className="section-heading"><div><span className="eyebrow">THE PLAYROOM <b>01 / 03</b></span><h2>Chơi một chút,<br/><em>vui cả ngày.</em></h2></div><p>Chọn một trò bạn thích.<br/>Mỗi câu trả lời là một điều thú vị để khám phá.</p></div>
      <div className="game-list">{games.map(game => <article className={`game-row ${game.playable ? 'game-active' : ''}`} key={game.number}>
        <span className="game-number">{game.number}</span><span className="game-symbol"><Icon name={game.icon} size={25}/></span>
        <div className="game-copy"><h3>{game.title}</h3><p>{game.text}</p></div><span className={`game-status ${game.playable ? 'status-ready' : ''}`}>{game.label}</span>
        <button className="game-button" disabled={!game.playable} onClick={startQuiz} aria-label={game.action}>{game.playable ? <Icon name="arrow" size={20}/> : <span>•••</span>}</button>
      </article>)}</div>
      <div className="play-foot"><span>MORE LITTLE GAMES ARE ON THEIR WAY</span><span>♡</span></div>
    </section>

    <section className="quote-section" id="story"><div className="quote-mark">“</div><span className="eyebrow">A GENTLE LITTLE REMINDER</span><h2>Hạnh phúc không cần<br/>phải thật lớn lao. <em>Chỉ cần thật lòng.</em></h2><p>Đôi khi là một câu hỏi han, một lần cùng cười, hay đơn giản là có người để trở về.</p><span className="quote-sign">A LITTLE LOVE NOTE</span><div className="quote-decoration"><Icon name="heart" size={30}/></div></section>

    <section className="private-section section-wrap" id="our-place">
      <div className="private-visual"><div className="private-visual-ring"/><div className="private-lock"><Icon name="lock" size={35}/></div><span className="private-stamp">ONLY THE TWO OF US · EST. 2023</span><span className="private-side-note">a place to keep our story</span></div>
      <div className="private-content"><span className="eyebrow">OUR PRIVATE LITTLE WORLD <b>02 / 03</b></span><h2>Một nơi chỉ<br/><em>hai ta được vào.</em></h2><p>Những bức ảnh, câu chuyện, ngày đặc biệt và ký ức của hai đứa mình sẽ được cất giữ ở đây.</p><form className="private-form" onSubmit={unlock}><label htmlFor="private-password">MẬT KHẨU RIÊNG CỦA CHÚNG MÌNH</label><div className="password-field"><Icon name="lock" size={17}/><input id="private-password" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Nhập mật khẩu để tiếp tục" autoComplete="off"/><button type="submit" aria-label="Tiếp tục"><Icon name="arrow" size={18}/></button></div>{error && <p className="form-error">{error}</p>}</form><div className="privacy-note"><span/> Khu vực riêng tư · Chỉ dành cho hai người</div></div>
    </section>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Icon name="heart" size={17}/></span><span className="brand-name">THE LITTLE LOVE CLUB<span>MADE WITH A LITTLE LOVE</span></span></a><span className="footer-center">Một góc nhỏ, thật nhiều thương yêu.</span><a className="footer-top" href="#top">Lên đầu trang ↑</a></footer>

    {quizOpen && <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Trắc nghiệm ngôn ngữ yêu"><div className="quiz-dialog"><button className="modal-close" onClick={()=>setQuizOpen(false)} aria-label="Đóng"><Icon name="close" size={20}/></button><span className="eyebrow">A LITTLE LOVE QUIZ</span>{!finished ? <><div className="quiz-progress"><span style={{width:`${answers.length / questions.length * 100}%`}}/></div><div className="quiz-count">CÂU HỎI {step + 1} / {questions.length}</div><h2>{questions[step].title}</h2><div className="quiz-options">{questions[step].options.map((option,index)=><button key={option} onClick={()=>pick(index)}><span>{String(index+1).padStart(2,'0')}</span>{option}<Icon name="arrow" size={17}/></button>)}</div></> : <div className="quiz-finish"><Icon name="heart" size={42}/><span className="quiz-count">KẾT QUẢ CỦA BẠN</span><h2>Một trái tim thật đặc biệt.</h2><p>{result}</p><button className="button button-dark" onClick={()=>{setAnswers([]);setStep(0)}}>Chơi lại <Icon name="arrow" size={16}/></button></div>}<div className="dialog-foot">THE LITTLE LOVE CLUB <span>♡</span></div></div></div>}
  </main>
}
export default App
