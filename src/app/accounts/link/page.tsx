"use client"
import { useParams } from "next/navigation";
import LinkAccountPage from "./components/LinkAccountPage"
import { UUID } from "crypto";


const AccountPage :React.FC = () => {
  const { accountId, userId, accountNum, accName, bankId } = useParams<{accountId:string; userId:UUID; accountNum:string; accName: string; bankId:string;}>();

  return(
    <div>
      <LinkAccountPage accountId ={Number("2")} accountNum={accountNum} accName={accName} userId="9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" bankId={Number(bankId)}/>
    </div>
  )
}

export default AccountPage;