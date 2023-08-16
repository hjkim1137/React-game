import './App.css';
import { useState } from 'react';

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
            props.onChangeMode(Number(event.target.id));
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

function Article(props) {
  // 클릭할 때마다 동적으로 변화하는 부분
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const title = event.target.title.value; // form 태그
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="body" placeholder="body"></textarea>
        </p>
        <p>
          <input type="submit" value="Create"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  // primitive 타입
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  // 이론1
  // object or array 타입(원본값을 바꾸면 안되고 복제본을 바꿔야 한다)
  // newValue = [...value] // 복제본 생성
  // setValue(newValue) // 복제본 변경

  // 이론1 심화
  // #잘못된 예제
  // const[value, setValue] = useState([1])
  // value.push(2) //원본 데이터를 변경
  // setValue(value) // 같은(원본)데이터이기 때문에 rendering x

  //#올바른 예제
  // const[value, setValue] = useState([1])
  // newValue =[...value]
  // newValue.push(2)
  // setValue(newValue)

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is...' },
  ]);
  let content = null;

  // mode에 따른 article 변경 조건(content 변수에 담음)
  if (mode === 'WELCOME') {
    content = <Article title="Welcome" body="Hello, WEB"></Article>;
  } else if (mode === 'READ') {
    let title = null;
    let body = null;

    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
  } else if (mode === 'CREATE') {
    content = (
      <Create
        onCreate={(_title, _body) => {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode('READ');
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  }
  return (
    <div>
      {/* 빨간색이 props로 전달하는 부분 */}
      <Header
        title="WEB"
        onChangeMode={() => {
          setMode('WELCOME');
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={(_id) => {
          setMode('READ'); //id가 들어오면 READ 모드
          setId(_id);
        }}
      ></Nav>
      {content}
      <a
        href="/create"
        onClick={(event) => {
          event.preventDefault();
          setMode('CREATE');
        }}
      >
        Create
      </a>
    </div>
  );
}

export default App;
