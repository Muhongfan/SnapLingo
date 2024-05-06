import * as React from "react";
import "./CardItem.scss";
function CardItem(item) {
  // const { post } = post;
if (item.post.explanation == null){
  return item.id
}
  let parsedExplanation;
  try {
    parsedExplanation = JSON.parse(item.post.explanation);


  } catch (error) {}
  
  let explanationLines;
  
  if (Array.isArray(parsedExplanation)) {
    explanationLines = [`${1}. ${parsedExplanation[0]}`]
      .concat(parsedExplanation.slice(1).map((e, i) => `${i + 2} ): ${e}`));
  } else {
    explanationLines = item.post.explanation.split("\n");
    explanationLines = explanationLines.length === 1
      ? explanationLines
      // : item.post.explanation.split("\n").map((e, i) => `${i + 1} : ${e}`);
      : explanationLines.map((e, i) => `${i + 1} : ${e}`);;
  }

  
  // const explanationLines = Array.isArray(parsedExplanation)
  //   ?[`${1}. ${parsedExplanation[0]}`]
  //       .concat(parsedExplanation.slice(1).map((e, i) => `${i + 1} ): ${e}`))
  //   : item.post.explanation.split("\n").map((e, i) => `${i + 1} : ${e}`);
  // const explanations = Object.values(item.post.explanation);
  // const explanationLines = explanationText.split('\n');

  // {
  //   explanationLines.map((exp, index) => console.log(typeof exp));
  // }
  return (
    <>
      <div className="cardItem__firstline">
        <h2>{item.post.label}</h2>
      </div>
      {/* <p className='cardItem__content'>{item.post.explanation}</p> */}
      <ol>
        {explanationLines.map((exp, index) => (
          <li key={index} className="cardItem__item">
            <p>{exp}</p>
          </li>
        ))}
      </ol>

      {/* <CardActions>
      <Button size="small">See dictionary</Button>
    </CardActions> */}
    </>
  );
}

export default CardItem;
