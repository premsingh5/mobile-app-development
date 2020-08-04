import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';

const Display = props=>{
  if(props.state.studyTimeflag){
    let min=Math.floor(props.state.studyTime/60)
    let sec=props.state.studyTime % 60
    return(<View>
      <Text>Study Time</Text>
      <Text>{min}:{sec} </Text>
      <Button onPress={props.onReset} title="reset"/>
      <Button onPress={props.onpause} title="pause" />
      <Button onPress={props.onstart} title="start" />
      </View>
  )

  }
   if(props.state.breaktimeflag){
    let min=Math.floor(props.state.breakTime/60)
    let sec=props.state.breakTime % 60
    return(<View>
      <Text>Break Time</Text>
      <Text>{min}:{sec} </Text>
      <Button onPress={props.onReset} title="reset"/>
      <Button onPress={props.onStop} title="pause" />
      <Button onPress={props.onStart} title="start" />
      </View>
  )

  }
}
export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      studyTime:900,
      breakTime:300,
      studyTimeflag:true,
      breaktimeflag:false,
      pause:false,
    }
  }

  componentDidMount(){
    this.update()
  }
  update= () => {
      if(this.state.studyTime > 0 || this.state.breakTime>0){setInterval(this.reduce,1000)}
  }

  onReset = ()=>{
    this.setState(prevState =>({
      studyTime:900,
      breakTime:300,
      studyTimeflag:true,
      breaktimeflag:false,
      pause:false,
    })
    )
  }
  onpause = ()=>{
    this.setState(prevState =>({
      pause:true
    })
  )
  }
  onstart = ()=> {
    this.setState(prevState =>({
    pause:false
    })
    )
  }

  reduce = ()=>{

      this.setState(
        prevState =>{
          if(prevState.pause === false){
          if(prevState.studyTime>0 && prevState.studyTimeflag){
            return {studyTime:prevState.studyTime-1}
          }
          if(prevState.studyTime===0 && prevState.breakTime>0){
            return{studyTimeflag:false,breaktimeflag:true,breakTime:prevState.breakTime-1}
          }
          if(prevState.breakTime===0){
            return {studyTimeflag:true,breaktimeflag:false,studyTime:15,breakTime:20}
          }
        }
        }
      )

  }

  render() {
    return (
      <View style={styles.container}>
        <Display
        onReset={()=>this.onReset()}
        onpause={()=>this.onpause()}
        onstart={()=>this.onstart()}
        state={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
