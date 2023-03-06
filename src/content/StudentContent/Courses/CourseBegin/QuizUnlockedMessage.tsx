import { Box, Grid, Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { CertificateImage } from "src/Assets";
import { Theme, useTheme } from '@material-ui/core/styles';
import { ButtonComp } from "src/components";

const QuizUnlockedMessage = ({
    setShowQuizUnlockedMsg,
    setTestTopic
}) => {

    const theme = useTheme();
    return(<>
    <Grid 
        container
        style={{
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        }}
        >
        <Grid item>
            <Typography 
            variant="caption"
            component="div" 
            style={{
                fontSize:'22px',
            }}
        >
          Have Unlocked the Quiz Successfully by Completing the Course!!
        </Typography>
        </Grid> 
        <Grid item container
            style={{
                display:'flex',
                justifyContent:'space-evenly'
            }}
        >
        <ButtonComp
            buttonTextColor={theme.Colors.whitePure}
            buttonText={'Take Quiz'}
            onClickButton={()=>{
                setTestTopic(true);
                setShowQuizUnlockedMsg(false);
            }}            
        ></ButtonComp>
        <ButtonComp
            buttonTextColor={theme.Colors.whitePure}
            buttonText={'Continue Learning'}
            onClickButton={()=>{
                setTestTopic(false);
                setShowQuizUnlockedMsg(false);
            }}                     
        ></ButtonComp>
    </Grid>
</Grid>
    
         </>
        )
};

export default QuizUnlockedMessage;