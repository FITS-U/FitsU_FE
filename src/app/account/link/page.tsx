import LinkAccountPage from "./components/LinkAccountPage"

interface Props {
  accountId: number;
  accountNum: string
  accName: string;
  userId: string;
  bankId: number;
}

const AccountPage :React.FC<Props> = ({ accountId, accountNum, accName, userId, bankId }) => {
  return(
    <div>
      <LinkAccountPage accountId={accountId} accountNum={accountNum} accName={accName} userId={userId} bankId={bankId}/>
    </div>
  )
}

export default AccountPage;