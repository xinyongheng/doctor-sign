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
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectDate: '2023-10-09',
    selectMonth: '2023-10',
    doctorWorkIndex: 1,
    gridHeight: 100,
    doctorWorkStyles: [
      '白班',
      '夜班',
      '下夜班',
      '日休',
    ],
    targetDate: new Date(Date.parse('2023-10-09')),
    week: ['一', '二', '三', '四', '五', '六', '日'],
    workDates: [
      { type: 0, year: 1, month: 1, date: 1, index: 0 },
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
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.setData({ targetDate: new Date(this.data.selectDate) })
    this.data.targetDate.setHours(0);
    this.data.targetDate.setMinutes(0);
    this.data.targetDate.setSeconds(0);
    this.data.targetDate.setMilliseconds(0);
    this.makeWorkDate(this.data.targetDate);
  },

  setSelectDate(datestring: string) {
    var dateObj = new Date(datestring);
    dateObj.setHours(0);
    dateObj.setMinutes(0);
    dateObj.setSeconds(0);
    dateObj.setMilliseconds(0);
    this.setData({ selectDate: datestring, targetDate: dateObj, selectMonth: datestring.substring(0, 7) });
  },

  bindDateChange: function (e: { detail: { value: string } }) {
    this.setSelectDate(e.detail.value)
    this.makeWorkDate(this.data.targetDate);
  },
  bindDoctorWorkChange(e: { detail: { value: number } }) {
    this.setData({ doctorWorkIndex: e.detail.value })
    this.makeWorkDate(this.data.targetDate);
  },
  /**
   * 是否为今天
   */
  isToday(year: number, month: number, date: number) {
    var now = new Date();
    // console.log('isToday');
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
  makeWorkDate(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1
    // 当月第一天
    const firstDate = new Date(year, date.getMonth(), 1);
    // 当月最后一天
    const lastDate = new Date(year, date.getMonth(), 0);
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
        const date = (valueIndex > emptyNum && valueIndex <= allNum) ? valueIndex - emptyNum : 0
        const type = this.loadWordType(year, month, date);
        const week = this.data.week[column];
        workDates.push({
          year, month, date,
          value: date ? date : '',
          index: valueIndex,
          type,
          week,
          explain: this.explainType(type),
          bgColor: this.loadBgColor(date, week),
          isToday: this.isToday(year, month, date),
        });
      }
    }
    this.setData({ workDates });
  },
  loadBgColor(date: number, week: string) {
    if (date && (week == '六' || week == '日')) {
      return 'red';
    }
    return date ? 'white' : 'transport'
  }
})