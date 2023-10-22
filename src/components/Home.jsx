import React, { useState } from 'react'
import axios from 'axios';
import Speaker from '../images/speaker.png'

const Home = () => {
    
    const [item, setItem] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState();

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setResult();
        try {
            setLoading(true);
            const {data} = await axios.post('http://localhost:4000/search',{item});
            setResult(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error.message);
        }
    }

    
    const handleSpeech = () => {
        const speech = new SpeechSynthesisUtterance();
        speech.text = `The price of ${result.title} is ${result.price}`;
        window.speechSynthesis.speak(speech);
    };


    return (
    <>
        <div className='flex justify-center align-middle items-center'>
            <div className='bg-white flex flex-col justify-center align-middle items-center rounded-3xl shadow-2xl w-[340px] md:w-[450px] md:h-[350px] lg:w-[450px] lg:h-[450px] mt-5 px-3 py-4 border-[2px] border-black font-semibold'> 
                <p className='text-center font-bold text-xl'>Search For Products</p>
                <form  className='flex flex-col' onSubmit={handleSubmit}>
                    <input className='md:w-72 bg-white rounded-3xl shadow-2xl mt-5 px-3 py-2 border-[2px] border-black font-semibold' type="text" required placeholder='Search Product' onChange={e=>setItem(e.target.value)} value={item} />
                    <button type="submit" className="bg-white hover:bg-[#526D82] mt-5 hover:text-white rounded-3xl shadow-2xl border-[2px] border-black font-semibold px-3 py-2">Search</button>
                </form>
                <div className='flex justify-center items-center m-8'>
                    {loading && 
                        <div
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                            Loading...</span>
                        </div>
                    }
                    
                    {result && <img src={result.image} alt="" className='h-24 pr-3' />}
                    {result && <span>The price of {result.title} is {result.price} </span>}
                    {result==='' && <span>No shopping ads found for {item}</span>}
                    {result && <img onClick={handleSpeech} src={Speaker} className='h-5 w-5 cursor-pointer'/> }
                </div>
            </div>
        </div>
    </>
  )
}

export default Home