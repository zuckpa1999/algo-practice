const {Graph, Node} = require('./graph-helper')

function merge(accounts) {
  let answer = []

  let mailToNameMap = new Map()
  let graph = new Map()

  for (let [name, ...emails] of accounts) {
    let [primary] = emails

    for (let email of emails) {
      if (!graph.has(email)) graph.set(email, new Set())

      graph.get(primary).add(email)
      graph.get(email).add(primary)
      mailToNameMap.set(email, name)
    }
  }

  let visited = new Set()

  for (let [email] of graph) {
    if (!visited.has(email)) {
      visited.add(email)

      let queue = [email]
      let emails = []

      while (queue.length > 0) {
        let node = queue.shift()
        emails.push(node)

        for (let e of graph.get(node)) {
          if (!visited.has(e)) {
            visited.add(e)
            queue.push(e)
          }
        }
      }

      answer.push([mailToNameMap.get(email), ...emails.sort()])
    }
  }

  return answer
}

console.log(
  merge([
    ['John', 'johnsmith@mail.com', 'john00@mail.com'],
    ['John', 'johnnybravo@mail.com'],
    ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
    ['Mary', 'mary@mail.com'],
  ]),
)

// [
// 	 ["John", 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com'],
// 	 ["John", "johnnybravo@mail.com"],
// 	 ["Mary", "mary@mail.com"]
// ]
