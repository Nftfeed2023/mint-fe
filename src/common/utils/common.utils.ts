

const getKeyEnumByValue = <T = any>(targetEnum: T, valueFind: any) => {
  return Object.keys(targetEnum)[Object.values(targetEnum).indexOf(valueFind)] || "";
}

const pipeLongTextUi = (value: string = "", leftCharAmount = 4, rightCharAmount = 4) => {
  if (value.length <= leftCharAmount + rightCharAmount + 3) {
    return value;
  }
  return `${value?.substring(0, leftCharAmount) ?? ''}...
  ${value?.substring(value.length - rightCharAmount) ?? ''}`
}

const getBaseUrl = () => {
  // check ENV
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 8006;
    return `${window.location.protocol}//${window.location.hostname}:${port}`
  }
  return `${window.location.protocol}//${window.location.hostname}`;
  // chưa thử sử dụng   process.env.PUBLIC_URL
}
const parseParams = (paramObject: Record<string, string>) => {
  return new URLSearchParams(paramObject).toString();
}



const checkURLType = (url: string) => {
  if (!url) {
    return "Other";
  }
  const videoExtensions = ['mp4', 'avi', 'mkv', 'mov'];
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
  const extension = url.split('.').pop().toLowerCase();
  if (videoExtensions.includes(extension)) {
    return 'Video';
  } else if (imageExtensions.includes(extension)) {
    return 'Image';
  } else {
    return 'Other';
  }
}


export {
  getKeyEnumByValue,
  pipeLongTextUi,
  getBaseUrl,
  parseParams,
  checkURLType,
}
