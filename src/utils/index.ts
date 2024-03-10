/* eslint-disable no-useless-concat */
import currencyFormatter from 'currency-formatter'

export const formatAddress = (address: string) => {
  return `${address?.substring(0, 4) ?? ''}...${address?.substring(address.length - 5) ?? ''
    }`
}

export const compareAddress = (address: string, compareAddress: string) => {
  return address?.toLowerCase() === compareAddress?.toLowerCase()
}

// export const formatMoney = (value: string | undefined) => {
//   return (
//     currencyFormatter
//       .format(Number(value?.toString()?.split(' ')[0]?.replace(/\./g, '')), {
//         code: 'VND',
//         symbol: '',
//       })
//       .trim() ?? ''
//   )
// }

export const formatMoney = (value: string | undefined) => {
  if (!value) {
    return "";
  }
  value = value
    // ?.replace(/\D/g, "")
    // .replace(/\./, "")
    .replace(/\,/g, "") ?? "0"
  const arrStr = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,").split(".");
  // console.log(`-------------------`);
  // console.log(arrStr);
  // console.log(`-------------------`);
  if (arrStr.length < 2) {
    return arrStr;
  }
  return `${arrStr[0]}.${arrStr[1].replace(/\,/g, "")}`

}

export const formatPrice = (price: number | undefined) => {
  if (!price) return 0
  return formatMoney(price.toString())
}

export const pipeAmount = (value: string | number) => {
  return Number(value).toFixed(2)
}
