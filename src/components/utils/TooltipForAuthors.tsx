interface TooltipForAuthorsProps {
  authors: string[];
}

const TooltipForAuthors: React.FC<TooltipForAuthorsProps> = ({ authors }) => {
  return (
    <div>
      {authors.map((author, index) => {
        return <p key={index}>{author}</p>;
      })}
    </div>
  );
};

export default TooltipForAuthors;
