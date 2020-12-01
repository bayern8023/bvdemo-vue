<template>
	<div id="cycleDatePicker">
		<div class="block">
			<!-- <span class="demonstration">多个日期</span> -->
			<el-date-picker type="dates"  @change="timechange" @focus="inputFocus" :picker-options="pickerOptions" value-format="yyyy-MM-dd" v-model="timeAll" placeholder="选择一个或多个日期">
			</el-date-picker>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			isType: {
				type: String,
				default: 'default'
			},
			startTime: {
				type: String,
				default: '2020-09-01'
			},
			endTime: {
				type: String,
				default: '2020-10-15'
			},
			isInit: {
				type: Boolean,
				default: false
			},
		},
		
		data() {
			return {
				pickerOptions: {
				  disabledDate: (time) => {
				    if (this.startTime || this.endTime) {
				      return (
				        time.getTime() <
				          new Date(this.startTime).getTime() - 8.64e7 ||
				        time.getTime() >
				          new Date(this.endTime).getTime() 
				      );
				// - 8.64e7 // 加- 8.64e7则表示包当天
				    } else {
				      return time.getTime() < Date.now() - 8.64e7;
				    }
				  },
				},
				timeAll: [],
				limitTimeWatch: false, //控制点击多选日期 进行未来时间push时限制多次走watch防止死循环
			};
		},
		watch: {
			timeAll: {
				handler(newVal, oldVal) {
					if(newVal===null){
						this.timeAll = [];
					}
					// console.log('timeAll-走了watch');
					if (this.isType == 'WEEK') {
						if (this.limitTimeWatch) {
							// console.log('timeAll-走了watch中的代码');
							// console.log(newVal, oldVal)
							if (newVal.length > oldVal.length) {
								//新增点击
								this.timeAll = [];
								this.limitTimeWatch = false;
								newVal.forEach(item => {
									if (oldVal.indexOf(item) == -1) {
										// console.log('当前点击-新增', item);
										var weekList = this.changeCycleTime('WEEK', this.startTime, this.endTime, item);
										var newTimeAll = [];
										weekList.forEach(subItem => {
											if (newVal.indexOf(subItem) == -1) {
												newTimeAll.push(subItem);
											}
										});
										this.timeAll = newTimeAll;
										this.timeAll.unshift(item);
									}
								})
							} else {
								//取消点击
								this.timeAll = [];
								this.limitTimeWatch = false;
								// oldVal.forEach(item => {
								// 	if (newVal.indexOf(item) == -1) {
								// 		// console.log('当前点击-取消', item)
								// 		var weekList=this.changeCycleTime('week', '2020-09-01', '2020-10-01', item);
								// 		var newTimeAll=[];
								// 		weekList.forEach(subItem=>{
								// 			if(newVal.indexOf(subItem)==-1){
								// 				newTimeAll.push(subItem);
								// 			}
								// 		});
								// 		this.timeAll=newTimeAll;
								// 		this.timeAll.unshift(item);
								// 	}
								// })
							}
						}
					}
					if (this.isType == 'MONTH') {
						if (this.limitTimeWatch) {
							// console.log('timeAll-走了watch中的代码');
							// console.log(newVal, oldVal)
							if (newVal.length > oldVal.length) {
								//新增点击
								// console.log('选择')
								//月不能清空timeAll
								// this.timeAll=[];
								this.limitTimeWatch = false;
								newVal.forEach(item => {
									if (oldVal.indexOf(item) == -1) {
										console.log('当前点击-新增', item);
										var weekList = this.changeCycleTime('MONTH', this.startTime, this.endTime, item);
										var newTimeAll = [];
										weekList.forEach(subItem => {
											if (newVal.indexOf(subItem) == -1) {
												newTimeAll.push(subItem);
											}
										});
										this.timeAll = newTimeAll;
										this.timeAll.unshift(item);
										// this.timeAll = this.changeCycleTime('MONTH', this.startTime, this.endTime, item);
									}
								})
								// this.timeAll=this.changeCycleTime(this.isType,this.startTime,this.endTime,this.startTime);
							} else {
								console.log('取消')
								//取消点击
								//月不用取消点击
								this.timeAll = [];
								this.limitTimeWatch = false;
							}
						}
					}
				},
				deep: true //对象内部属性的监听，关键。
			}
		},
		mounted(){
			if(this.isInit){
				//true初始组件日期
				this.timeAll=this.changeCycleTime(this.isType,this.startTime,this.endTime,this.startTime,true);
			}
			console.log(document.querySelector('#cycleDatePicker .el-input__suffix'),99999)
			document.querySelector('#cycleDatePicker .el-input__suffix').onclick=()=>{
				this.limitTimeWatch = true;
				console.log(111111)
			}
		},
		methods: {
			timechange(){
				  this.$emit("timechanges", this.timeAll); //创建会议参数
			},
			inputFocus() {
				setTimeout(() => {
					// document.querySelectorAll('.available').forEach(item => {
					// 	item.onclick = () => {
					// 		this.limitTimeWatch = true;
					// 		console.log('执行了available')
					// 		// console.log(this.limitTimeWatch)
					// 	}
					// })
					// document.querySelectorAll('.next-month').forEach(item => {
					// 	item.onclick = () => {
					// 		this.limitTimeWatch = true;
					// 		console.log('执行了next-month')
					// 		// console.log(this.limitTimeWatch)
					// 	}
					// })
					document.querySelectorAll('.el-picker-panel__body td').forEach(item => {
						item.onclick = () => {
							this.limitTimeWatch = true;
							// console.log('执行了.el-picker-panel__body td')
							// console.log(this.limitTimeWatch)
						}
					})
					document.querySelectorAll('.el-picker-panel__body td').forEach(item => {
						item.onclick = () => {
							this.limitTimeWatch = true;
							// console.log('执行了.el-picker-panel__body td')
							// console.log(this.limitTimeWatch)
						}
					})
				})
			},
			//周、月
			changeCycleTime(type, startTime, endTime, currentTime,isInit) {
				var num=0;
				// type:week、month
				//判断是否闰年
				function isYear(year) {
					if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
						// console.log('闰年')
						return '闰年';
					} else {
						// console.log('平年')
						return '平年';
					}
				}
				var yearVal = isYear(new Date().getFullYear());
				//开始时间戳
				var startTimeStamp = '';
				switch (typeof(startTime)) {
					case 'number':
						startTimeStamp = startTime;
						break;
					case 'string':
						startTimeStamp = new Date(startTime).getTime();
						break;
					case 'object':
						startTimeStamp = startTime.getTime();
						break;
					default:
						console.log('解析失败');
						break;
				};
				//结束时间戳
				var endTimeStamp = '';
				switch (typeof(endTime)) {
					case 'number':
						endTimeStamp = endTime;
						break;
					case 'string':
						endTimeStamp = new Date(endTime).getTime();
						break;
					case 'object':
						endTimeStamp = endTime.getTime();
						break;
					default:
						console.log('解析失败');
						break;
				};
				//当前点击的时间戳
				var currentTimeStamp = '';
				switch (typeof(currentTime)) {
					case 'number':
						currentTimeStamp = currentTime;
						break;
					case 'string':
						currentTimeStamp = new Date(currentTime).getTime();
						break;
					case 'object':
						currentTimeStamp = currentTime.getTime();
						break;
					default:
						console.log('解析失败');
						break;
				};
				var two = yearVal == '闰年' ? 29 : 28;
				var monthNum = [31, two, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
				var weekStamp = 7 * 86400000; //一天=24*60*60*1000;
				//判断是周还是月
				if (this.isType == 'WEEK') {
					var time = [];
					var timeBefore = [];
					var all=[];
					weekFilterTimeBefore(startTimeStamp, endTimeStamp, currentTimeStamp);
					weekFilterTime(startTimeStamp, endTimeStamp, currentTimeStamp);
					all.push(...timeBefore)
					all.push(...time);
					//isInit修复 切换周期tab标签第一天默认选择不上的bug
					if(isInit){
						console.log(111111,startTime)
						all.unshift(startTime)
					}
					// console.log('8888888888000000000000000',all)
					var newAll=[];
					all.forEach(item=>{
						var str=item.split('/').join('-');
						newAll.push(str);
					})
					return newAll;
				}
				if (this.isType == 'MONTH') {
					var time = [];
					var timeBefore = [];
					var all=[];
					// monthFilterTimeBefore(startTimeStamp, endTimeStamp, currentTimeStamp);
					// console.log(startTimeStamp, endTimeStamp, currentTimeStamp,new Date(startTimeStamp),new Date(endTimeStamp),new Date(currentTimeStamp),'开始')
					monthFilterTime(startTimeStamp, endTimeStamp, currentTimeStamp);
					// console.log(time, '月时间')
					all.push(...timeBefore)
					all.push(...time);
					var newAll=[];
					all.forEach(item=>{
						var str=item.split('/').join('-');
						newAll.push(str);
					})
					console.log(time,timeBefore,all,'时间')
					return newAll;
				}
				//递归函数-点击一次时间后把相对应的未来时间找出来
				function weekFilterTime(startTime, endTime, currentTime) {
					// console.log('执行了',num,time)
					if(num>3000) return;
					num++;
					//点击时间的未来时间
					var filterTime = currentTime + weekStamp;
					// console.log(filterTime,8888)
					if (filterTime <= endTime) {
						// 解决跨年选周2月份差一天问题
						var yearVal = isYear(new Date(currentTime).getFullYear());
						var two = yearVal == '闰年' ? 29 : 28;
						monthNum.splice(1,1,two);
						// 
						// console.log(new Date(filterTime).getDate(),555,new Date(filterTime).getDate(),monthNum[new Date(currentTime).getMonth()])
						if (new Date(currentTime).getDate() + 7 > monthNum[new Date(currentTime).getMonth()]) {
							var dateObj = new Date(currentTime);
							var date = (new Date(currentTime).getDate() + 7) - monthNum[new Date(currentTime).getMonth()];
							var month = (dateObj.getMonth() + 2) > 12 ? (dateObj.getMonth() + 2) - 12 : (dateObj.getMonth() + 2);
							var year = (dateObj.getMonth() + 2) > 12 ? dateObj.getFullYear() + 1 : dateObj.getFullYear();
							var dataStr = year + '/' + month + '/' + date;
							time.push(dataStr);
							weekFilterTime(startTime, endTime, new Date(time[time.length - 1]).getTime());
						} else {
							var date = new Date(filterTime);
							var dataStr = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
							time.push(dataStr);
							weekFilterTime(startTime, endTime, new Date(time[time.length - 1]).getTime());
						}
					}
					// console.log('-------------------------------------')
				}

				function weekFilterTimeBefore(startTime, endTime, currentTime) {
					//点击时间的过去时间
					var BeforefilterTime = currentTime - weekStamp;
					if (BeforefilterTime >= startTime) {
						// 解决跨年选周2月份差一天问题
						var yearVal = isYear(new Date(currentTime).getFullYear());
						var two = yearVal == '闰年' ? 29 : 28;
						monthNum.splice(1,1,two);
						// 
						if (new Date(currentTime).getDate() - 7 >= 1) {
							var dateObj = new Date(currentTime);
							var date = (new Date(currentTime).getDate() - 7);
							var month = dateObj.getMonth() + 1;
							var year = dateObj.getFullYear();
							var dataStr = year + '/' + month + '/' + date;
							timeBefore.push(dataStr);
							weekFilterTimeBefore(startTime, endTime, new Date(timeBefore[timeBefore.length - 1]).getTime());
						} else {
							var dateObj = new Date(currentTime);
							var date = monthNum[new Date(currentTime).getMonth() == 0 ? 11 : new Date(currentTime).getMonth() - 1] - Math.abs(
								(new Date(currentTime).getDate() - 7));
							// console.log(date,999999,monthNum[new Date(currentTime).getMonth()==0?11:new Date(currentTime).getMonth()],new Date(currentTime).getMonth()==0?11:new Date(currentTime).getMonth(),(new Date(currentTime).getDate() - 7))
							var month = dateObj.getMonth() == 0 ? 12 : dateObj.getMonth();
							var year = month == 12 ? dateObj.getFullYear() - 1 : dateObj.getFullYear();
							var dataStr = year + '/' + month + '/' + date;
							timeBefore.push(dataStr);
							weekFilterTimeBefore(startTime, endTime, new Date(timeBefore[timeBefore.length - 1]).getTime());
						}
					}
				}
				function monthFilterTimeBefore(startTime, endTime, currentTime){
					var yearVal = isYear(new Date(currentTime).getFullYear());
					var two = yearVal == '闰年' ? 29 : 28;
					monthNum.splice(1,1,two);
					var currentDate=new Date(currentTime);
					var currenYear=currentDate.getFullYear();//年
					var currenMonth=currentDate.getMonth();//月-如果获取正常的月是需要+1，此处就需要当前月-1，所以直接不用加也不用减就可以了
					if(currenMonth==0){
						//0代表1月，一月减一个月就是12月，所以年需要减一下
						currenYear--;
					}
					var currenT=new Date(time[0]).getDate();//天
					if (monthNum[currenMonth - 1] < currenT) {
						currenT = monthNum[currenMonth - 1];
						// console.log('选择的那天-选择日期大于当前月',currenT)
					}
					var newCurrentTime=currenYear+'/'+currenMonth+'/'+currenT;
					if(new Date(newCurrentTime).getTime()>startTime){
						timeBefore.push(currenYear+'/'+currenMonth+'/'+currenT);
						console.log(timeBefore,5555)
						// console.log('push',newCurrentTime)
						monthFilterTimeBefore(startTime, endTime, new Date(timeBefore[timeBefore.length-1]).getTime());
					}
					
				}
				function monthFilterTime(startTime, endTime, currentTime) {
					console.log(startTime, endTime, currentTime, '参数')
					var yearVal = isYear(new Date(currentTime).getFullYear());
					var two = yearVal == '闰年' ? 29 : 28;
					monthNum.splice(1,1,two);
					if (time.length) {
						console.log('走1')
						var year = new Date(time[time.length - 1]).getFullYear();
						var month = new Date(time[time.length - 1]).getMonth() + 2;
						year = month > 12 ? year + 1 : year;
						month = month > 12 ? 1 : month;
						
						var date = new Date(time[0]).getDate();
						console.log('选择的那天-经过判断前',date);
						if (monthNum[month - 1] < date) {
							date = monthNum[month - 1];
							console.log('选择的那天-选择日期大于当前月',date)
						}
						console.log('选择的那天-经过判断后',date);
						console.log(month,date,monthNum[month - 1],'console一下',time)
						var dateStr = year + '/' + month + '/' + date;
						console.log(dateStr)
						if (new Date(dateStr).getTime() <= endTime) {
							time.push(dateStr);
							monthFilterTime(startTime, endTime, new Date(time[time.length-1]).getTime());
						}
						console.log(month,88888,monthNum[month - 1],date)
					} else {
						console.log('走2')
						console.log(new Date(startTime).getMonth(),888)
						var year = new Date(startTime).getFullYear();
						var month = new Date(startTime).getMonth() + 1;
						var date = new Date(currentTime).getDate();
						if (monthNum[month-1] < date) {
							console.log('改变date99999999999999')
							date = monthNum[month-1];
						}
						var dateStr = year + '/' + month + '/' + date;
						console.log(dateStr,99999)
						if (new Date(dateStr).getTime() >= startTime || (date==new Date(startTime).getDate() && month==new Date(startTime).getMonth()+1 && year==new Date(startTime).getFullYear())) {
							time.push(dateStr);
							monthFilterTime(startTime, endTime, new Date(time[time.length-1]).getTime());
							console.log('走2-if push')
						}else{
							//选择的天比开始时间的天小
							month++;
							if(month>12){
								month=1;
								year++;
							}else{
								if (monthNum[month-1] < date) {
									date = monthNum[month-1];
								}
							}
							var dateStr = year + '/' + month + '/' + date;
							time.push(dateStr);
							monthFilterTime(startTime, endTime, new Date(time[time.length-1]).getTime());
							console.log('走2-else push')
						}
						// time.push(dateStr);
						// monthFilterTime(startTime, endTime, new Date(time[time.length-1]).getTime());
					}
				}
			},
		}
	};
</script>

<style scoped>

</style>
