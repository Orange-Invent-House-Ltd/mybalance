import rightcaret from '../../assets/Icons/rightcaret.svg'

type lockprops = {
  lockicon:string;
  date:string;
  heading:string;
  text:string;
}

const LockMoneyBox = ({lockicon, date, heading, text}:lockprops) => {
  return (
    <div className='px-6 py-2 rounded border shadow shadow-[#E4E4E4] border-white mt-6'>
      <div className='flex items-center gap-3'>
        <img src={lockicon} alt="lock" className="w-[20px]"/>
        <p className='text-[10px] text-[#B7B7B7] font-normal'>{date}</p>
        <img src={rightcaret} alt="go" className='w-[15px] ml-auto' />
      </div>
      <div className="pl-8 mt-1 text-[#303030] ">
        <p className="text-lg font-medium">{heading}</p>
        <p className="mt-1">{text}</p>
      </div>
    </div>
  )
}

export default LockMoneyBox