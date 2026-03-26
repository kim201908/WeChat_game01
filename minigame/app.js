// app.js
App({
  globalData: {
    // 基础资源
    money: 200,          // 初始资金
    reputation: 10,      // 声誉
    level: 1,            // 餐厅等级
    
    // 厨师系统
    chefs: [
      { id: 1, name: '王师傅', level: 1, efficiency: 1.0, cost: 100, specialty: '川菜' },
    ],
    
    // 菜品系统
    dishes: [
      { id: 1, name: '拍黄瓜', price: 8, level: 1, cost: 3 },
      { id: 2, name: '麻婆豆腐', price: 18, level: 1, cost: 8 },
      { id: 3, name: '宫保鸡丁', price: 28, level: 1, cost: 12 },
    ],
    
    // 装修系统
    decorations: {
      table: { level: 1, count: 2, cost: 150 },    // 桌椅
      decor: { level: 1, cost: 200 },              // 装饰
      kitchen: { level: 1, cost: 300 },            // 厨房
    },
    
    // 经营数据
    customers: 0,        // 累计接待客人
    revenue: 0,          // 累计收入
    lastSaveTime: Date.now(),
    
    // 成就系统
    achievements: [],
  },

  onLaunch() {
    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'your-env-id',  // 替换为你的云开发环境 ID
        traceUser: true,
      })
    }
    
    // 加载游戏存档
    this.loadGame()
    
    // 启动收益定时器（每秒结算）
    this.startRevenueTimer()
  },

  // 计算每秒收益
  calcRevenuePerSecond() {
    const { chefs, dishes, decorations } = this.globalData
    
    // 厨师效率加成
    const chefBonus = chefs.reduce((sum, chef) => {
      return sum + (chef.efficiency * chef.level * 0.1)
    }, 0)
    
    // 菜品收入
    const dishRevenue = dishes.reduce((sum, dish) => {
      return sum + (dish.price * dish.level * 0.5)
    }, 0)
    
    // 装修加成
    const decorBonus = 1 + 
      (decorations.table.level * 0.2) +
      (decorations.decor.level * 0.15) +
      (decorations.kitchen.level * 0.15)
    
    // 最终收益
    const revenue = dishRevenue * (1 + chefBonus) * decorBonus
    return revenue
  },

  // 启动收益定时器
  startRevenueTimer() {
    setInterval(() => {
      const revenue = this.calcRevenuePerSecond()
      this.globalData.money += revenue
      this.globalData.revenue += revenue
      this.globalData.customers += 1
      
      // 自动保存（每 10 秒）
      if (Date.now() % 10000 < 1000) {
        this.saveGame()
      }
      
      // 更新界面
      this.updateUI()
    }, 1000)
  },

  // 雇佣厨师
  hireChef(chefId) {
    const chef = this.globalData.chefs.find(c => c.id === chefId)
    if (!chef) return false
    
    if (this.globalData.money >= chef.cost) {
      this.globalData.money -= chef.cost
      chef.level++
      chef.cost = Math.floor(chef.cost * 1.5)
      this.saveGame()
      return true
    }
    return false
  },

  // 升级菜品
  upgradeDish(dishId) {
    const dish = this.globalData.dishes.find(d => d.id === dishId)
    if (!dish) return false
    
    const upgradeCost = dish.cost * dish.level * 5
    if (this.globalData.money >= upgradeCost) {
      this.globalData.money -= upgradeCost
      dish.level++
      this.saveGame()
      return true
    }
    return false
  },

  // 升级装修
  upgradeDecoration(type) {
    const decor = this.globalData.decorations[type]
    if (!decor) return false
    
    if (this.globalData.money >= decor.cost) {
      this.globalData.money -= decor.cost
      decor.level++
      decor.cost = Math.floor(decor.cost * 1.6)
      
      // 特殊处理桌椅
      if (type === 'table') {
        decor.count++
      }
      
      this.saveGame()
      return true
    }
    return false
  },

  // 解锁新菜品
  unlockDish(newDish) {
    const exists = this.globalData.dishes.find(d => d.id === newDish.id)
    if (!exists && this.globalData.money >= newDish.cost) {
      this.globalData.money -= newDish.cost
      this.globalData.dishes.push(newDish)
      this.saveGame()
      return true
    }
    return false
  },

  // 游戏存档
  saveGame() {
    this.globalData.lastSaveTime = Date.now()
    
    // 本地存储
    wx.setStorageSync('gameSave', this.globalData)
    
    // 云存储（如果已配置）
    if (wx.cloud) {
      wx.cloud.callFunction({
        name: 'saveGame',
        data: {
          saveData: this.globalData
        }
      }).catch(err => {
        console.log('云保存失败:', err)
      })
    }
  },

  // 加载存档
  loadGame() {
    try {
      const saved = wx.getStorageSync('gameSave')
      if (saved && saved.money !== undefined) {
        // 计算离线收益
        const offlineTime = (Date.now() - saved.lastSaveTime) / 1000
        if (offlineTime > 60) {  // 离线超过 1 分钟
          const offlineRevenue = this.calcOfflineRevenue(saved, offlineTime)
          this.globalData.money += offlineRevenue
          console.log(`离线 ${Math.floor(offlineTime)}秒，获得 ¥${Math.floor(offlineRevenue)}`)
        }
        
        // 合并存档数据
        this.globalData = { ...this.globalData, ...saved }
      }
    } catch (err) {
      console.log('读取存档失败:', err)
    }
  },

  // 计算离线收益
  calcOfflineRevenue(savedData, offlineTime) {
    // 使用存档时的数据计算
    const chefBonus = savedData.chefs.reduce((sum, chef) => {
      return sum + (chef.efficiency * chef.level * 0.1)
    }, 0)
    
    const dishRevenue = savedData.dishes.reduce((sum, dish) => {
      return sum + (dish.price * dish.level * 0.5)
    }, 0)
    
    const decorBonus = 1 + 
      (savedData.decorations.table.level * 0.2) +
      (savedData.decorations.decor.level * 0.15) +
      (savedData.decorations.kitchen.level * 0.15)
    
    const revenuePerSecond = dishRevenue * (1 + chefBonus) * decorBonus
    return revenuePerSecond * offlineTime * 0.8  // 离线收益打 8 折
  },

  // 更新界面（由页面自行实现）
  updateUI() {
    // 这个方法会在页面中被重写
  },

  // 检查成就
  checkAchievements() {
    const { money, reputation, customers, level } = this.globalData
    const newAchievements = []
    
    const achievements = [
      { id: 1, name: '第一桶金', condition: () => money >= 1000, reward: 100 },
      { id: 2, name: '名满天下', condition: () => reputation >= 100, reward: 200 },
      { id: 3, name: '客似云来', condition: () => customers >= 1000, reward: 300 },
      { id: 4, name: '连锁餐厅', condition: () => level >= 10, reward: 500 },
    ]
    
    achievements.forEach(ach => {
      if (ach.condition() && !this.globalData.achievements.includes(ach.id)) {
        this.globalData.achievements.push(ach.id)
        this.globalData.money += ach.reward
        newAchievements.push(ach)
      }
    })
    
    if (newAchievements.length > 0) {
      this.saveGame()
      wx.showToast({
        title: `解锁 ${newAchievements.length} 个成就！`,
        icon: 'success'
      })
    }
    
    return newAchievements
  }
})
