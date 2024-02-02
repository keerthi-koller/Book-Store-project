import { Box, Rating } from "@mui/material";

function FeedbackComponent({feedBack}:{feedBack:any}) {
    
    return (<>
        <div className="flex justify-center mt-5 mb-20">
            <div className="w-full flex gap-5">
                <div className="border w-2/12 h-[40px] border-[#E4E4E4] bg-[#F5F5F5] rounded-full flex justify-center items-center">
                    <h1 className="text-xs text-[#707070]">AC</h1>
                </div>
                <div>
                    <h1 className="font-bold">{feedBack?.user_id?.fullName}</h1>
                    <Box>
                        <Rating name="read-only" value={feedBack?.rating} readOnly />
                    </Box>
                    <p className="text-wrap text-sm text-slate-500">{feedBack?.comment}</p>
                </div>
            </div>
        </div>
    </>)
}

export default FeedbackComponent;