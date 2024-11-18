"use client"
import { useParams } from "next/navigation";
import LinkAccountPage from "./components/LinkAccountPage"


const AccountPage :React.FC = () => {
  const { accountId, userId, accountNum, accName, bankId } = useParams<{accountId:string; userId:string; accountNum:string; accName: string; bankId:string;}>();

  return(
    <div>
      <LinkAccountPage accountId={Number(accountId)} accountNum={accountNum} accName={accName} userId={userId} bankId={Number(bankId)}/>
    </div>
  )
}

export default AccountPage;