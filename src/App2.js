function Header(props) {
  return (
    <header>
      <h1>
        <a href="/">{props.title}</a>
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let topic = props.topics[i];
    lis.push(
      <li key={topic.id}>
        <a href={'/read' + topic.id}>{topic.title}</a>
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
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function App2() {
  const topics = [
    { id: 1, title: 'html', body: 'html is...' },
    { id: 2, title: 'css', body: 'css is...' },
    { id: 3, title: 'javascript', body: 'javascript is..' },
  ];
  return (
    <div>
      <Header title="React"></Header>
      <Nav topics={topics}></Nav>
      <Article title="hello" body="hello web"></Article>
    </div>
  );
}

export default App2;
