// import Link from "next/link";/
import SetUpAccountPage from "@/app/account/components/SetUpAccountPage"

interface Props {
  bankId: number;
  bankName: number;
}

const AccountPage : React.FC<Props> = ({ bankId, bankName })=> {
  return (
    <div>
        <SetUpAccountPage bankId={bankId} bankName={bankName}/>
    </div>
  )
}

export default AccountPage;