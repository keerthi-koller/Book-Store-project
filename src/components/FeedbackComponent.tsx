import { Box, Rating } from "@mui/material";

function FeedbackComponent({feedBack}:{feedBack:any}) {

    const nameArray = feedBack?.user_id?.fullName?.split(' ');
    let name = '';
    nameArray?.forEach((element:any) => {
        name=name+element.charAt(0);
    });
    name=name.toUpperCase();
    
    return (<>
        <div className="flex justify-center mb-10">
            <div className="w-full flex gap-5">
                <div className="border w-1/12 h-[35px] border-[#E4E4E4] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                    <h1 className="text-xs text-[#707070]">{name}</h1>
                </div>
                <div>
                    <h1 className="font-bold">{feedBack?.user_id?.fullName}</h1>
                    <Box>
                        <Rating name="read-only" value={feedBack?.rating} readOnly />
                    </Box>
                    <p className="text-wrap text-sm text-slate-500">{feedBack?.comment}. Even though the translation could have been better, Chanakya's neeti are thought provoking. Chanakya has written on many different topics andhis writing are succinct.</p>
                </div>
            </div>
        </div>
    </>)
}

export default FeedbackComponent;