export default function LegalContent({ content, compact = false }: { content: string; compact?: boolean }) {
  const blocks = content.replace(/\r/g, '').split(/\n\s*\n/).filter(Boolean);
  return <div className={compact ? 'legal-content legal-content-compact' : 'legal-content'}>{blocks.map((block,index)=>{
    const lines=block.split('\n');
    const heading=lines[0];
    const body=lines.slice(1);
    if(heading.startsWith('## ')) return <section key={index}><h2>{heading.slice(3)}</h2>{body.length?<Body lines={body}/>:null}</section>;
    if(heading.startsWith('### ')) return <section key={index}><h3>{heading.slice(4)}</h3>{body.length?<Body lines={body}/>:null}</section>;
    return <Body key={index} lines={lines}/>;
  })}</div>;
}

function Body({lines}:{lines:string[]}){
  const list=lines.filter(Boolean).every(line=>line.startsWith('- '));
  if(list)return <ul>{lines.map((line,index)=><li key={index}>{line.slice(2)}</li>)}</ul>;
  return <p>{lines.map((line,index)=><span key={index}>{line}{index<lines.length-1?<br/>:null}</span>)}</p>;
}
