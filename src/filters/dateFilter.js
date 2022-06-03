//import store from "@/store";
// // export default function dateFilter(value,format = 'date') {
// //     console.log(value)
// //  return value
// // }
// export default function dateFilter(value,format = 'date') {
//     const options = {}
//     // if (format.includes('date')){
//     options.day = '2-digit'
//     options.month = 'long'
//     options.year = 'numeric'
//     options.hour = '2-digit'
//     options.minute = '2-digit'
//     options.second = '2-digit'
//     // }
//     // if (format.includes('time')){
//     //     options.hour = '2-digit'
//     //     options.minute = '2-digit'
//     //     options.second = '2-digit'
//     // }


//     const locale = store.getters.info.locale || 'uk-UK'
//     return new Intl.DateTimeFormat('uk-UK' locale, options).format(new Date(value))
//     // return new Intl.DateTimeFormat('uk-UK').format(new Date(value))
// }
