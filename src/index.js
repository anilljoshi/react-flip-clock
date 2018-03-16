import React, {Component} from 'react';
import styles from './style.scss';
import { isEmpty } from "../js";


class FlipClock extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			titleText:'',
			days: 0,
			daysShuffle: true,
			hours: 0,
			hoursShuffle: true,
			minutes: 0,
			minutesShuffle: true,
			seconds: 0,
			secondsShuffle: true,
			isExpired:false
		};
	}
	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateTime(),
			59
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateTime() {

		const time = new Date;
		const startDate = new Date(this.props.startDate);	
		const endDate = new Date(this.props.endDate);

		var clockTime;	
		if(!isEmpty(startDate) && startDate>time){
			clockTime = startDate;
			this.setState({titleText:this.props.startText})	
		}else{
			clockTime = endDate;
			this.setState({titleText:this.props.endText})
		}

		if(clockTime>time){
			var delta = Math.abs(clockTime - time) / 1000;

			// calculate (and subtract) whole days
			var days = Math.floor(delta / 86400);
			delta -= days * 86400;

			// calculate (and subtract) whole hours
			var hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;

			// calculate (and subtract) whole minutes
			var minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;

			// what's left is seconds
			var secondss = delta % 60;  // in theory the modulus is not required
			var seconds = parseInt(secondss)
			console.log(seconds)

			// on hour chanage, update hours and shuffle state
			if( days !== this.state.days) {
				const daysShuffle = !this.state.daysShuffle;
				this.setState({
					days,
					daysShuffle
				});
			}	

			// on hour chanage, update hours and shuffle state
			if( hours !== this.state.hours) {
				const hoursShuffle = !this.state.hoursShuffle;
				this.setState({
					hours,
					hoursShuffle
				});
			}
			// on minute chanage, update minutes and shuffle state
			if( minutes !== this.state.minutes) {
				const minutesShuffle = !this.state.minutesShuffle;
				this.setState({
					minutes,
					minutesShuffle
				});
			}
			// on second chanage, update seconds and shuffle state
			if( seconds !== this.state.seconds) {
				const secondsShuffle = !this.state.secondsShuffle;
				this.setState({
					seconds,
					secondsShuffle
				});
			}
		}else{
			this.setState({isExpired:true})
		}
	}

	render() {
		const { days, hours, minutes, seconds, daysShuffle, hoursShuffle, minutesShuffle, secondsShuffle } = this.state;
		return(
			(this.state.isExpired)
			?
			<div className={styles.flipContainer}>
				<center className={styles.title}>Expired</center>
			</div>
			:
			<div className={styles.flipContainer}>
				<center className={styles.title}>{this.state.titleText}</center>
				<div className={styles.flipClock}>	
					{
						(days>0)&&
						<div className={styles.flipCover}>
							<FlipUnitContainer 
								unit={'days'}
								digit={days} 
								shuffle={daysShuffle} 
							/>
							<center className={styles.font8}>DAY</center>
						</div>
					}
					<div className={styles.flipCover}>	
						<FlipUnitContainer 
							unit={'hours'}
							digit={hours} 
							shuffle={hoursShuffle} 
						/>
						<center className={styles.font8}>HRS</center>
					</div>
					<div className={styles.flipCover}>
						<FlipUnitContainer 
							unit={'minutes'}
							digit={minutes} 
							shuffle={minutesShuffle} 
						/>
						<center className={styles.font8}>MIN</center>
					</div>
					<div className={styles.flipCover}>
						<FlipUnitContainer 
							unit={'seconds'}
							digit={seconds} 
							shuffle={secondsShuffle} 
						/>
						<center className={styles.font8}>SEC</center>
					</div>
				</div>
			</div>
		);
	}
}
export default FlipClock;

const FlipUnitContainer = props =>{
	
	
		const { digit, shuffle, unit } = props;
		
		let now = digit;
		let before = digit===59 ? digit : digit + 1;
		
		// to prevent a negative value
		if( unit !== 'hours') {
			before = before === -1 ? 59 : before;
		}else {
			before = before === -1 ? 23 : before;
		}
		
		// add zero
		if( now < 10 ) now = `0${now}`; 
		if( before < 10 ) before = `0${before}`;
		
		//shuffle digits
		const digit1 = shuffle ? before : now;
		const digit2 = !shuffle ? before : now;
		
		// shuffle animations
		const animation1 = shuffle ? 'fold' : 'unfold';
		const animation2 = !shuffle ? 'fold' : 'unfold';
		
		return(
			<div className={styles.flipUnitContainer}>
				<StaticCard 
					position={'upperCard'} 
					digit={now} 
					/>
				<StaticCard 
					position={'lowerCard'} 
					digit={before} 
					/>
				<AnimatedCard 
					position={'first'}
					digit={digit1}
					animation={animation1}
					/>
				<AnimatedCard 
					position={'second'}
					digit={digit2}
					animation={animation2}
					/>
			</div>
		);
}

const AnimatedCard = props => {
	
	const { position, digit, animation } = props;
	return(
		<div className={`${styles.flipCard} ${styles[position]}  ${styles[animation]}`}>
			<span>{digit}</span>
		</div>
	);
	
}

const StaticCard = props => {
	
	const { position, digit } = props;
	return(
		<div className={styles[position]}>
			<span>{digit}</span>
		</div>
	);
}		
	