// 筛选出所有的文件夹
export function filterFloders (data) {
  if(!data || data.length === 0) return null
  for (let i = 0; i < data.length ; i++) {
    if (data[i].children) {
      filterFloders(data[i].children)
    }
  }
  return data
}

const isFolder = (data) => {
  return data.children
}
