import parse from 'html-react-parser';

const Details = ({ posts }) => {
  console.log('posts----->', posts[9]?.description);

  const desc = { title: '', description: '<p>qwdfdsasdfdsqw</p>', file: null };
  console.log('desc---->', desc);
  return (
    <>
      <div className="ProseMirror">{parse(desc.description)}</div>
    </>
  );
};

export default Details;
