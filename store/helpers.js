import { MONTH_NAMES, DAY_NAMES } from "./constants";

export const formatDate = function(dateParams){
    const date = new Date(dateParams*1000);
    
    const day = date.getDay();
    const dateNumb = date.getDate();
    const month = date.getMonth()-1;
    const year = date.getFullYear();
    
    return DAY_NAMES[day] + ", " + dateNumb  + " " + MONTH_NAMES[month+1] + " " + year;
};

export const formatDateTime = function(dateParams){
  const date = new Date(dateParams*1000);
  
  const day = date.getDay();
  const dateNumb = date.getDate();
  const month = date.getMonth()-1;
  const year = date.getFullYear();

  const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours() ;
  const minute = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes();
  
  return DAY_NAMES[day] + ", " + dateNumb  + " " + MONTH_NAMES[month+1] + " " + year + " " + hour + ":" + minute;
};

export const toMonthYearDate = function(dateParams){
  const date = new Date(dateParams);
  
  const month = date.getMonth();
  const year = date.getFullYear();
  
  return MONTH_NAMES[month] + " " + year;
};

export const toNumber = str => {
  return String(str).replace(/\D/gi, "");
};

export const toFormatedNumber = num => {
  return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const toLongDate = function(dateString, delimiter = "/") {
  if (!dateString) return null;
  let parts = [];
  if (typeof dateString === "object") {
    parts.push(dateString.getDate());
    parts.push(dateString.getMonth() + 1);
    parts.push(dateString.getFullYear());
  } else {
    parts = dateString.split(delimiter);
  }
  return `${+parts[0]} ${MONTH_NAMES[+parts[1] - 1]} ${parts[2]} `;
};

// // Parse a longDate string to a Date
// export const fromLongDate = function(longDateString) {
//   const parts = longDateString.split(" ");
//   return new Date(
//     parts[2],
//     MONTH_NAMES.findIndex(x => parts[1] == x),
//     parts[0]
//   );
// };

// Format string
function roundByMillion(number) {
  return Math.ceil(number / 100000) / 10;
}

export const shortSalary = function(min, max, type) {
  return `Rp ${roundByMillion(min)}-${roundByMillion(max)}jt/${type}`;
};

export const mediumSalary = function(min, max, type) {
  return `Rp ${roundByMillion(min)}-${roundByMillion(max)} jt / ${type}`;
};

// Factory
export const asyncArraysObject = function(keys) {
  const obj = {};
  keys.forEach(key => {
    obj[key] = [];
    obj[`is${key}Loading`] = false;
  });
  return obj;
};

// Object manipulation
export const setArrayItemProps = function(array, item, props) {
  array.map(_item => {
    if (_item.id === item.id) {
      _item = Object.assign(_item, props);
    }
    return _item;
  });
};

export const formatJobs = function(jobs) {
  return jobs.map(job => ({
    ...job,
    salary: shortSalary(job.salary_min, job.salary_max, job.salary_type),
    isLoadingApply: false
  }));
};

export const formatPartnerVacancy = function(jobs) {
  return jobs.map(job => ({
    ...job,
    salary: shortSalary(job.salary_min, job.salary_max, job.salary_type),
    isLoadingApply: false,
    isSave: job.with_js !== undefined
  }));
};

// Image loader promise
export const loadImage = function(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};
