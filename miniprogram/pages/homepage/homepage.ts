// pages/homepage/homepage.ts
interface WorkSetting {
  type: number,
  date: number,
  year: number,
  month: number,
  week: string,
  index: number,
  value: number | string,
  explain: string,
  bgColor: string,
  isToday?: boolean,
  dateType?: string,
  lunarDate: string,
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectDate: '2025-01-02',
    selectMonth: '2025-01',
    doctorWorkIndex: 0,
    gridHeight: 100,
    doctorWorkStyles: [
      '白班',
      '夜班',
      '下夜班',
      '日休',
    ],
    targetDate: new Date(Date.parse('2025-01-02')),
    week: ['一', '二', '三', '四', '五', '六', '日'],
    workAllYearDate: [{ monthTag: '2023-01', workDates: [{ type: 0, year: 1, month: 1, date: 1, index: 0 }] }],
    chineseNumber: [
      "正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"
    ],
    holiday: [
      {
        year: 2023,
        holidayList: [
          { date: "2023-01-01", explain: "元旦" },
          { date: "2023-01-02", explain: "元旦" },
          { date: "2023-01-21", explain: "春节" },
          { date: "2023-01-22", explain: "春节" },
          { date: "2023-01-23", explain: "春节" },
          { date: "2023-01-24", explain: "春节" },
          { date: "2023-01-25", explain: "春节" },
          { date: "2023-01-26", explain: "春节" },
          { date: "2023-01-27", explain: "春节" },
          { date: "2023-04-05", explain: "清明节" },
          { date: "2023-09-29", explain: "中秋节" },
          { date: "2023-04-29", explain: "劳动节" },
          { date: "2023-04-30", explain: "劳动节" },
          { date: "2023-05-01", explain: "劳动节" },
          { date: "2023-05-02", explain: "劳动节" },
          { date: "2023-05-03", explain: "劳动节" },
          { date: "2023-06-22", explain: "端午节" },
          { date: "2023-06-23", explain: "端午节" },
          { date: "2023-06-24", explain: "端午节" },
          { date: "2023-09-30", explain: "国庆节" },
          { date: "2023-10-01", explain: "国庆节" },
          { date: "2023-10-01", explain: "国庆节" },
          { date: "2023-10-02", explain: "国庆节" },
          { date: "2023-10-03", explain: "国庆节" },
          { date: "2023-10-04", explain: "国庆节" },
          { date: "2023-10-05", explain: "国庆节" },
          { date: "2023-10-06", explain: "国庆节" },
        ],
        repairList: [
          { date: "2023-01-28", explain: "春节" },
          { date: "2023-04-23", explain: "劳动节" },
          { date: "2023-05-06", explain: "劳动节" },
          { date: "2023-06-25", explain: "端午节" },
          { date: "2023-10-07", explain: "国庆节" },
          { date: "2023-10-08", explain: "国庆节" },
        ]
      },
      {
        year: 2025,
        holidayList: [
          { date: "2025-01-01", explain: "元旦" },
          { date: "2025-01-28", explain: "春节" },
          { date: "2025-01-29", explain: "春节" },
          { date: "2025-01-30", explain: "春节" },
          { date: "2025-01-31", explain: "春节" },
          { date: "2025-02-01", explain: "春节" },
          { date: "2025-02-02", explain: "春节" },
          { date: "2025-02-03", explain: "春节" },
          { date: "2025-02-04", explain: "春节" },
          { date: "2025-04-04", explain: "清明节" },
          { date: "2025-04-05", explain: "清明节" },
          { date: "2025-04-06", explain: "清明节" },
          { date: "2025-05-01", explain: "劳动节" },
          { date: "2025-05-02", explain: "劳动节" },
          { date: "2025-05-03", explain: "劳动节" },
          { date: "2025-05-04", explain: "劳动节" },
          { date: "2025-05-05", explain: "劳动节" },
          { date: "2025-05-31", explain: "劳动节" },
          { date: "2025-06-01", explain: "端午节" },
          { date: "2025-06-02", explain: "端午节" },
          { date: "2025-10-01", explain: "国庆节" },
          { date: "2025-10-02", explain: "国庆节" },
          { date: "2025-10-03", explain: "国庆节" },
          { date: "2025-10-04", explain: "国庆节" },
          { date: "2025-10-05", explain: "国庆节" },
          { date: "2025-10-06", explain: "国庆节" },
          { date: "2025-10-07", explain: "国庆节" },
          { date: "2025-10-08", explain: "国庆节" },
        ],
        repairList: [
          { date: "2025-01-26", explain: "春节" },
          { date: "2025-02-08", explain: "春节" },
          { date: "2025-04-27", explain: "劳动节" },
          { date: "2025-09-28", explain: "国庆节" },
          { date: "2025-10-11", explain: "国庆节" },
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    console.log(this.explainLocal(2025, 2, 12));
    wx.getSystemInfo({
      key: "lastDate",
      success(res: any) {
        if (res && res.data) {
          that.data.doctorWorkIndex = res.data.doctorWorkIndex;
          that.data.selectDate = res.data.selectDate;
        }
        that.initData(that.data.selectDate);
      },
      fail() {
        that.initData(that.data.selectDate);
      }
    })
  },

  initData: function (selectDate: string) {
    this.setData({ targetDate: new Date(selectDate) });
    this.data.targetDate.setHours(0);
    this.data.targetDate.setMinutes(0);
    this.data.targetDate.setSeconds(0);
    this.data.targetDate.setMilliseconds(0);
    this.makeAllDate(this.data.targetDate);
  },

  setSelectDate(datestring: string) {
    var dateObj = new Date(datestring);
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    this.setData({ selectDate: datestring, targetDate: dateObj, selectMonth: datestring.substring(0, 7) });
  },
  saveSelectData: function (selectDate: string, index: number) {
    wx.setStorage({
      key: "lastDate",
      data: { selectDate, doctorWorkIndex: index },
    });
  },
  bindDateChange: function (e: { detail: { value: string } }) {
    this.setSelectDate(e.detail.value);
    this.saveSelectData(e.detail.value, this.data.doctorWorkIndex);
    this.makeAllDate(this.data.targetDate);
  },
  bindDoctorWorkChange(e: { detail: { value: number } }) {
    this.setData({ doctorWorkIndex: e.detail.value })
    this.saveSelectData(this.data.selectDate, e.detail.value);
    this.makeAllDate(this.data.targetDate);
  },
  /**
   * 是否为今天
   */
  isToday(year: number, month: number, date: number) {
    var now = new Date();
    return now.getFullYear() == year && now.getMonth() == (month - 1) && date == now.getDate();
  },
  /**
   * 根据日期获取排班
   */
  loadWordType(year: number, month: number, date: number) {
    const dateObj = new Date(year, month - 1, date);
    const _time = dateObj.getTime() - this.data.targetDate.getTime();
    var _day = _time / 3600 / 24000;
    var _a = _day % 4
    if (_a < 0) _a += 4;
    // console.log(_a + ', ' + _day);
    var word_setting = this.explainToNum(this.data.doctorWorkStyles[this.data.doctorWorkIndex]);
    var _b = word_setting + _a
    // console.log(_a + ', ' + _b);
    return _b > 4 ? _b - 4 : _b;
  },
  /**
   * 类型装欢
   */
  explainType(type: number) {
    switch (type) {
      case 1:
        return '白班';
      case 2:
        return '夜班';
      case 3:
        return '下夜班';
      case 4:
        return '日休';
      default:
        // console.log('错误: ' + type);
        return '错误';
    }
  },
  explainToNum(style: string) {
    switch (style) {
      case '白班':
        return 1;
      case '夜班':
        return 2;
      case '下夜班':
        return 3;
      case '日休':
        return 4;
      default:
        // console.log('错误: ' + type);
        return 0;
    }
  },
  makeAllDate(date: Date) {
    var year = date.getFullYear();
    var startMonth = date.getMonth();
    var arr = [];
    for (let index = startMonth; index < 12; index++) {
      var newDate = new Date(year, index, 1, 0, 0, 0, 0);
      var workDates = this.makeWorkDate(newDate);
      arr.push({ monthTag: year + "-" + this.no2string(index + 1), workDates });
    }
    this.setData({ workAllYearDate: arr });
  },
  makeWorkDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1
    // 当月第一天
    const firstDate = new Date(year, date.getMonth(), 1);
    // 当月最后一天
    const lastDate = new Date(year, month, 0);
    // 当月第一天 星期
    const firstWeek = firstDate.getDay();
    const emptyNum = firstWeek == 0 ? 6 : (firstWeek - 1);
    const allNum = emptyNum + lastDate.getDate();
    const maxRow = Math.ceil(allNum / 7);
    const gridHeight = 60 * maxRow + 60;
    this.setData({ gridHeight });
    var workDates: Array<WorkSetting> = [];
    for (let row = 0; row < maxRow; row++) {
      for (let column = 0; column < this.data.week.length; column++) {
        const valueIndex = row * 7 + column + 1;
        const date = (valueIndex > emptyNum && valueIndex <= allNum) ? valueIndex - emptyNum : 0;
        const type = this.loadWordType(year, month, date);
        const week = this.data.week[column];
        var lunar = date ? this.explainLocal(year,month,date) : "";
        if(lunar=="春节"){
          workDates[workDates.length-1].lunarDate="除夕";
        }
        workDates.push({
          year, month, date,
          value: date ? date : '',
          index: valueIndex,
          type,
          week,
          explain: this.explainType(type),
          bgColor: this.loadBgColor(date, week),
          isToday: this.isToday(year, month, date),
          dateType: this.checkDateType(year, month, date),
          // lunarDate:this.getLunarDate(new Date(year, month, date, 0, 0, 0, 0)),
          lunarDate: date ? this.explainLocal(year,month,date) : "",
        });
      }
    }
    return workDates;
  },
  loadBgColor(date: number, week: string) {
    if (date && (week == '六' || week == '日')) {
      return 'red';
    }
    return date ? 'white' : 'transport'
  },
  no2string(num: number): string {
    if (num < 10) {
      return '0' + num;
    }
    return num.toString();
  },
  checkDateType(year: number, month: number, date: number) {
    if (date) {
      var value = this.data.holiday.find(item => item.year == year);
      if (value) {
        var checkDateString = year + '-' + this.no2string(month) + '-' + this.no2string(date);
        var holidayList = value.holidayList;
        if (holidayList) {
          var result = holidayList.find(item => checkDateString == item.date);
          if (result) {
            return '休';
          }
        }
        var repairList = value.repairList;
        if (repairList) {
          var result = repairList.find(item => checkDateString == item.date);
          if (result) {
            return '班';
          }
        }
      }
    }
    return undefined;
  },
  explainLocal: function (year: number, month: number, day: number) {
    var date = new Date(year, month - 1, day, 10);
    var s = date.toLocaleString("zh-Hans-u-ca-chinese");
    // var start = s.indexOf("年");
    console.log(s);

    var reg = /年((.*月)(\d+))\s+/;
    var result = reg.exec(s);
    if (!result) return ""
    // var cnDate = result[1];
    // if (cnDate == "正月15") return "元宵节";
    // console.log(result[3]);
    // console.log(result[2]);
    return this.numToCN(parseInt(result[3]),result[2]);
  },
  numToCN: function (date: number, monthCn: string) {
    if (monthCn == "正月") {
      if (date == 1) return "春节";
      if (date == 15) return "元宵节";
    }
    if (date == 1) return monthCn;
    if (date == 20) return "廿十";
    if (date <= 10) return "初" + this.nTC(date);
    if (date < 20) return "十" + this.nTC(date % 10);
    if (date < 30) return "廿" + this.nTC(date % 10);
    if (date == 30) return "三十";
    if (date > 30) return "三十" + this.nTC(date % 10);
    return monthCn;
  },
  nTC: function (no: number) {
    if (no == 2) return "二";
    if (no == 3) return "三";
    if (no == 4) return "四";
    if (no == 5) return "五";
    if (no == 6) return "六";
    if (no == 7) return "七";
    if (no == 8) return "八";
    if (no == 9) return "九";
    if (no == 10) return "十";
    return "";
  }
})