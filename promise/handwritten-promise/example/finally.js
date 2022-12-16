// 实例（原型）方法：finally 成功、失败时都执行
/**
 * @description finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
 *
 * finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。
 * 由于无法知道promise的最终状态，所以 finally 的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况。
 */
import MyPromise from '../promise.js'

const p1 = new MyPromise((resolve, reject) => {
  resolve(1)
}).finally(() => {
  console.log('finally')
})

p1.finally(() => {
  console.log('finally') // finally
})
