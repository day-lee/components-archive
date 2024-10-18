import axios from 'axios'

const id = "id";
const values = {
  topText: "top",
  bottomText: "bottom",
  memeImg: "",
};

const URL = "https://api.imgflip.com/get_memes";

function MemeGenerator() {
  /**
   * 1. fetch the data: useEffect(), cleanup,
   * 2. display the data: state update
   * 3. error handling: test
   */

  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      const resData = res.data.data.memes;
      const randomId = Math.floor(Math.random() * 101);
      const randomImg = resData[randomId].url
      return randomImg;
  
    } catch(error) {
      console.error("ERROR: " + error)
      return;
    }

  }

  fetchData()

  const onTextChange = () => {};
  const onImgButtonClick = () => {};

  return (
    <>
      <div className="w-full border-[1px] border-gray">
        <header className="flex items-center bg-gradient-to-r from-[#672280] to-[#A626D3] w-[550px] h-[65px] text-white font-bold p-4">
          <h2>Meme generator</h2>
        </header>
        <div className="px-[36px] pt-[28px] pb-[47px]">
          <main>
            <form className="flex gap-[33px] justify-between text-left text-[14px]">
              <div className="w-[222px]">
                <label htmlFor={id + "top-text"} className="font-medium">
                  Top text
                </label>
                <input
                  id="top-text"
                  name="topText"
                  className="border-2 border-[#D1D5DB] rounded-[5px] pl-[10px] py-[7px] w-full font-semibold "
                  type="text"
                  placeholder="Shut up"
                  value={values.topText}
                  onChange={onTextChange}
                  maxLength="15"
                />
              </div>
              <div className="w-[222px]">
                <label htmlFor={id + "bottom-text"} className="font-medium">
                  Bottom text
                </label>
                <input
                  id="bottom-text"
                  name="bottomText"
                  className="border-2 border-[#D1D5DB] rounded-[5px] pl-[10px] py-[7px] w-full font-semibold"
                  type="text"
                  placeholder="And take my money"
                  value={values.bottomText}
                  onChange={onTextChange}
                  maxLength="15"
                />
              </div>
            </form>
          </main>
          <div>
            <button
              className="w-full bg-gradient-to-r from-[#672280] to-[#A626D3] text-white text-4 mt-4 mb-8"
              aria-label="get a new image"
              onClick={onImgButtonClick}
            >
              Get a new meme image 🖼
            </button>
          </div>
          <div className="w-[477px] relative flex flex-col items-center justify-center font-impact text-shadow-custom text-white">
            <div className="absolute top-4 text-[32px] font-impact">
              {values.topText}
            </div>
            <img className="w-[477px]" src={values.memeImg} alt="meme" />
            <div className="absolute bottom-4 text-[32px] font-impact text-shadow-custom text-white">
              {values.bottomText}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MemeGenerator;
