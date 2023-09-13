import {Box, Container,Modal, Tooltip, Typography} from "@mui/material";
import EnchancedScatterplot from "../components/chart/EnchancedScatterplot";
import TrendRadioPicker from "../components/experiments/TrendRadioPicker";
import enhancedCSPData from "../data/enhancedCSPData.json";
import experimentData from "../data/experimentData.json";
import Timeseries from "../components/chart/Timeseries";
import Scatterplot from "../components/chart/Scatterplot";

import {getFormattedTimeseriesForExtScatter} from "../util/util";
import {useState,useEffect } from "react";
const Sample = () => {
    const [open, setOpen] = useState(false);
    const [prediction, setpredictionResult] = useState({timeline:[],connected:[],enhanced:[]});

   
    const series = getFormattedTimeseriesForExtScatter(enhancedCSPData[0].data);
    const onTrendChange = (btnprediction, correct,chart_id) =>{
    if(correct==btnprediction){
        prediction[chart_id]={"result":"Correct","color":"green"}
    }else{
        prediction[chart_id]={"result":"Try Again","color":"red"}
    }
    setpredictionResult(prevState => ({...prevState,prediction}))
   
    }
  
    const onChartClick = (i, id, symbol) => {
        
        setOpen(true);
       
        
      }
      const sharedAxisOptions = {
        tickWidth: 0,
        labels: {
          enabled: false,
        }
      }
      const ScatterchartOptions = {
        chart: {
          height: 200,
          width: 200
        },
        xAxis: {
          ...sharedAxisOptions,
          title: {
            text: experimentData.axis.scatterplot.x.name.toUpperCase() + ` (${experimentData.axis.scatterplot.x.resolution})`,
          }
        },
        yAxis: {
          ...sharedAxisOptions,
          title: {
            text: experimentData.axis.scatterplot.y.name.toUpperCase() + ` (${experimentData.axis.scatterplot.y.resolution})`,
          }
        }
      }
    

  return (
    <Container maxWidth={"md"}>
      <h2>Welcome to the mockup!</h2>
      <Typography fontSize={20} paragraph>
        In this mockup, you can get to know <b>three small experiments</b> to predict the <b>trend</b>. A sample of each experiment in the actual study is given below.
      </Typography>
      <h2>Timeline:</h2>
      <Box  p={2} border={"1px dashed lightgrey"}>
      <Timeseries options={{
          series,
          showInLegend: true,
          
        }}/>
      <TrendRadioPicker onChange={(newPrediction) => onTrendChange(newPrediction,"down","timeline")}  />
      <center><Typography component={"span"} align="center" color={prediction.timeline.color}>{prediction.timeline.result}</Typography></center>
      </Box>
      <h2>Connected Scatterplot:</h2>
      <Box p={2} maxWidth={200} border={"1px dashed lightgrey"}>
      <Scatterplot data={experimentData.data[0].data.scatterplot} options={ScatterchartOptions}/>
      <TrendRadioPicker onChange={(newPrediction) => onTrendChange(newPrediction,experimentData.data[0].trend,"connected")}/>
      <center><Typography component={"span"} align="center" color={prediction.connected.color}>{prediction.connected.result}</Typography></center>
    
      </Box>
      
      <h2>Enchanced interface:</h2>
      <Box p={2} maxWidth={200} border={"1px dashed lightgrey"}>
            <EnchancedScatterplot data={enhancedCSPData[0]} i={1} id={1} onChartClick={onChartClick} />
            <TrendRadioPicker onChange={(newPrediction) => onTrendChange(newPrediction,enhancedCSPData[0].trend,"enhanced")} />
            <center><Typography component={"span"} align="center" color={prediction.enhanced.color}>{prediction.enhanced.result}</Typography></center>
    
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        keepMounted
      >
        <Box
          p={2}
          backgroundColor={"white"}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            
          <Timeseries options={{
          series,
          showInLegend: true,
          
        }}/>
        </Box>
      </Modal>
     
    </Container>
  );
}

export default Sample;