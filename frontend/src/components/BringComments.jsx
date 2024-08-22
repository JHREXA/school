export const BringComments = ({ comments = [] }) => {
  console.log("Comments:", comments);
  return (
    <>
      {comments.map((comment, i) => (
        <div className="comments" key={i}>
          <h4>{comment.author}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
};
