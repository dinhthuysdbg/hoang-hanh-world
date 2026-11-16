import './App.css'

const memories = [
  { date: 'MỘT NGÀY ĐẶC BIỆT', title: 'Ngày mình gặp nhau', text: 'Có những cuộc gặp gỡ rất tình cờ, nhưng lại trở thành điều đẹp nhất.', tone: 'rose', mark: '♡' },
  { date: 'NHỮNG ĐIỀU BÌNH DỊ', title: 'Đi cùng nhau qua ngày thường', text: 'Một bữa ăn ngon, một lần dạo phố, hay chỉ là ngồi cạnh nhau.', tone: 'lilac', mark: '✳' },
  { date: 'VẪN ĐANG VIẾT TIẾP', title: 'Còn nhiều điều phía trước', text: 'Mình cứ chậm rãi thương nhau, và gom thêm thật nhiều kỷ niệm.', tone: 'blue', mark: '☼' },
]

function App() {
  return <main>
    <nav className="nav"><a className="brand" href="#home"><span className="brand-mark">h.</span><span>our little world</span></a><div className="nav-links"><a href="#story">Câu chuyện</a><a href="#memories">Kỷ niệm</a><a href="#letter">Lời nhắn</a></div><a className="nav-pill" href="#letter">Gửi một lời thương <span>↗</span></a></nav>
    <section className="hero" id="home">
      <div className="hero-copy"><p className="eyebrow"><i/> A LITTLE PLACE FOR OUR LOVE</p><h1>Thế giới nhỏ,<br/><em>chỉ có chúng mình.</em></h1><p className="hero-text">Nơi cất giữ những ngày bình thường trở nên thật đặc biệt. Những khoảnh khắc đã qua, những điều đang có, và cả những ước mơ còn ở phía trước.</p><div className="hero-actions"><a className="primary-btn" href="#story">Khám phá câu chuyện <span>→</span></a><span className="since">Made with love, always ♡</span></div></div>
      <div className="hero-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="photo-frame"><div className="photo-placeholder"><span className="photo-sun">✳</span><span className="photo-caption">you & me<br/><small>our favorite chapter</small></span></div></div><span className="float-note note-one">♡ forever</span><span className="float-note note-two">little moments</span><span className="spark spark-one">✦</span><span className="spark spark-two">✧</span></div>
      <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span className="scroll-line"/><span>01 — 03</span></div>
    </section>
    <section className="intro section-wrap" id="story"><div className="section-kicker">01 / OUR STORY</div><div className="intro-grid"><h2>Một hành trình<br/>được viết bằng <em>yêu thương.</em></h2><div><p className="intro-lead">Có người bước vào cuộc sống, rồi mọi điều nhỏ bé cũng hóa thành kỷ niệm.</p><p className="muted">Đây là góc nhỏ dành riêng cho Hoàng Hạnh — nơi lưu lại câu chuyện của hai đứa mình bằng hình ảnh, lời nhắn và những dấu mốc đáng nhớ.</p><a className="text-link" href="#memories">Đi qua những kỷ niệm <span>↗</span></a></div></div></section>
    <section className="memories section-wrap" id="memories"><div className="section-heading"><div><div className="section-kicker">02 / THE LITTLE THINGS</div><h2>Những điều mình <em>muốn nhớ.</em></h2></div><span className="side-note">Every moment matters ♡</span></div><div className="memory-grid">{memories.map((m, i)=><article className={`memory-card ${m.tone}`} key={m.title}><div className="memory-top"><span>0{i+1}</span><span>{m.mark}</span></div><div className="memory-art"><span>{m.mark}</span></div><p className="card-date">{m.date}</p><h3>{m.title}</h3><p>{m.text}</p><a href="#letter" aria-label="Đọc thêm">↗</a></article>)}</div></section>
    <section className="quote-band"><span className="quote-mark">“</span><p>Hạnh phúc không cần điều gì quá lớn lao,<br/>chỉ cần mỗi ngày đều có <em>chúng mình.</em></p><span className="quote-heart">♡</span></section>
    <section className="letter section-wrap" id="letter"><div className="letter-card"><div className="section-kicker">03 / A NOTE FOR YOU</div><div className="letter-content"><div><h2>Gửi người<br/><em>mình thương.</em></h2><p>Mong rằng khi ghé nơi này, em sẽ luôn tìm thấy một điều gì đó khiến mình mỉm cười.</p></div><div className="letter-stamp">H<br/><span>♡</span></div></div><div className="letter-foot"><span>With all my love,</span><span>Always & forever ♡</span></div></div></section>
    <footer><a className="brand" href="#home"><span className="brand-mark">h.</span><span>our little world</span></a><span>Made for Hoàng Hạnh, with love ♡</span><a href="#home">Back to top ↑</a></footer>
  </main>
}
export default App
