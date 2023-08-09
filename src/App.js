import './App.css';

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Header(props) {
  console.log('props:', props.title);
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>
      </h1>
    </header>
  );
}
function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]; //i 번째 요소
    lis.push(
      <li key={t.id}>
        {/* 리액트에서는 동적으로 생성된 요소에 한해서는 추적을 위해 고유 값을 줘야한다 */}
        <a
          id={t.id}
          href={'/read/' + t.id}
          onClick={(event) => {
            event.preventDefault();
            props.onChangeMode(event.target.id);
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ol>{lis}</ol>
    </nav>
  );
}

function App() {
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is...' },
  ];
  return (
    <div>
      <Header
        title="WEB"
        onChangeMode={() => {
          alert('header');
        }}
      ></Header>
      <Nav topics={topics} onChangeMode={(id) => alert(id)}></Nav>
      <Article title="WELCOME" body="Hello, WEB"></Article>
    </div>
  );
}

export default App;
