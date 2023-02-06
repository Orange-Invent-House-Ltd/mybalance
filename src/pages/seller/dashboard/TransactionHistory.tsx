import Header from "../../../components/reuseable/Header"
import DashboardHistoryBox from '../../../components/reuseable/DashboardHistoryBox'



const TransactionHistory = () => {
  return (
    <div>
      <Header
        Heading='Transaction History'
        Text='You can view an endless list of transaction you have transacted over time.'
      />
      <DashboardHistoryBox 
        header='White Air Jordans'
        text='Pair of white Air Jordans from Young Jonn'
        status="In progress"
        price='₦20,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
      <DashboardHistoryBox 
        header='Apple Series 2'
        text='Apple series 2 smartwatch ...'
        status="Pending"
        price='₦10,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
      <DashboardHistoryBox 
        header='Apple Series 2'
        text='Apple series 2 smartwatch ...'
        status="Successful"
        price='₦10,000.00'
        subtext='Dec 11, 2022 3:00 PM'
      />
    </div>
  )
}

export default TransactionHistory