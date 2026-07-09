// function NoteCard({ note }) {
//   return (
//     <article className="note-card">
//       <h3>{note.title}</h3>
//       <p>{note.body}</p>
//       <small>{note.date}</small>
//     </article>
//   );
// }

export default function NoteCard({title, body, date}) {
  return (
    <article className="note-card">
      <h3>{title}</h3>
      <p>{body}</p>
      <small>{date}</small>
    </article>
  );
}