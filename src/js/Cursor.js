import hammerImage from "../../asset/hammer.png"; 

export default function createCursor() {
  function init(){
    document.body.style.cursor = `url(${hammerImage}) 16 16, auto`;
  }
  function reset(){
    document.body.style.cursor = "auto";
  }
  init(); 
  return {
    reset
  };
}