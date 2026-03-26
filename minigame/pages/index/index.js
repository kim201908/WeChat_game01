// pages/index/index.js
const app = getApp()

Page({
  data: {
    money: 0,
    reputation: 0,
    chefs: [],
    dishes: [],
    decorations: {},
    customers: 0,
    revenue: 0,
    revenuePerSecond: 0,
    maxRevenue: 100,
    achievements: [],
    totalAchievements: 10,
    showAchievement: false,
    achievementName: '',
    Math: Math
  },

  onLoad() {
    // 设置全局 UI 更新方法
    app.updateUI = () => {
      this.updateUI()
    }
  },

  onShow() {
    // 页面显示时刷新数据
    this.updateUI()
  },

  // 更新界面
  updateUI() {
    const { globalData } = app
    
    // 计算每秒收益
    const revenuePerSecond = app.calcRevenuePerSecond()
    
    this.setData({
      money: Math.floor(globalData.money),
      reputation: globalData.reputation,
      chefs: globalData.chefs,
      dishes: globalData.dishes,
      decorations: globalData.decorations,
      customers: globalData.customers,
      revenue: globalData.revenue,
      revenuePerSecond: revenuePerSecond.toFixed(1),
      achievements: globalData.achievements,
    })
    
    // 检查成就
    const newAchievements = app.checkAchievements()
    if (newAchievements.length > 0) {
      this.showAchievementToast(newAchievements[0].name)
    }
  },

  // 显示成就提示
  showAchievementToast(name) {
    this.setData({
      showAchievement: true,
      achievementName: name
    })
    
    setTimeout(() => {
      this.setData({
        showAchievement: false
      })
    }, 2000)
  },

  // 升级厨师
  upgradeChef(e) {
    const chefId = e.currentTarget.dataset.id
    const success = app.hireChef(chefId)
    
    if (success) {
      wx.vibrateShort()
      this.updateUI()
      wx.showToast({
        title: '升级成功！',
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '金钱不足',
        icon: 'none'
      })
    }
  },

  // 雇佣新厨师
  hireNewChef() {
    const newChefs = [
      { id: Date.now(), name: '李大厨', level: 1, efficiency: 1.2, cost: 200, specialty: '粤菜' },
      { id: Date.now() + 1, name: '张师傅', level: 1, efficiency: 1.1, cost: 150, specialty: '鲁菜' },
      { id: Date.now() + 2, name: '刘大厨', level: 1, efficiency: 1.15, cost: 180, specialty: '淮扬菜' },
    ]
    
    const randomChef = newChefs[Math.floor(Math.random() * newChefs.length)]
    const exists = app.globalData.chefs.find(c => c.name === randomChef.name)
    
    if (exists) {
      wx.showToast({
        title: '已拥有该厨师',
        icon: 'none'
      })
      return
    }
    
    if (app.globalData.money >= randomChef.cost) {
      app.globalData.chefs.push(randomChef)
      app.globalData.money -= randomChef.cost
      app.saveGame()
      this.updateUI()
      wx.vibrateShort()
      wx.showToast({
        title: `雇佣 ${randomChef.name} 成功！`,
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '金钱不足',
        icon: 'none'
      })
    }
  },

  // 升级菜品
  upgradeDish(e) {
    const dishId = e.currentTarget.dataset.id
    const success = app.upgradeDish(dishId)
    
    if (success) {
      wx.vibrateShort()
      this.updateUI()
      wx.showToast({
        title: '升级成功！',
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '金钱不足',
        icon: 'none'
      })
    }
  },

  // 解锁新菜品
  unlockNewDish() {
    const newDishes = [
      { id: 101, name: '鱼香肉丝', price: 32, level: 1, cost: 15, unlockCost: 500 },
      { id: 102, name: '红烧肉', price: 48, level: 1, cost: 20, unlockCost: 800 },
      { id: 103, name: '糖醋里脊', price: 38, level: 1, cost: 16, unlockCost: 600 },
      { id: 104, name: '扬州炒饭', price: 22, level: 1, cost: 10, unlockCost: 300 },
      { id: 105, name: '小笼包', price: 18, level: 1, cost: 8, unlockCost: 250 },
    ]
    
    const availableDishes = newDishes.filter(d => 
      !app.globalData.dishes.find(existing => existing.id === d.id)
    )
    
    if (availableDishes.length === 0) {
      wx.showToast({
        title: '已解锁所有菜品',
        icon: 'none'
      })
      return
    }
    
    const randomDish = availableDishes[Math.floor(Math.random() * availableDishes.length)]
    
    if (app.globalData.money >= randomDish.unlockCost) {
      app.globalData.money -= randomDish.unlockCost
      app.globalData.dishes.push({
        id: randomDish.id,
        name: randomDish.name,
        price: randomDish.price,
        level: 1,
        cost: randomDish.cost
      })
      app.saveGame()
      this.updateUI()
      wx.vibrateShort()
      wx.showToast({
        title: `解锁 ${randomDish.name} 成功！`,
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: `需要 ¥${randomDish.unlockCost}`,
        icon: 'none'
      })
    }
  },

  // 升级装修
  upgradeDecoration(e) {
    const type = e.currentTarget.dataset.type
    const success = app.upgradeDecoration(type)
    
    if (success) {
      wx.vibrateShort()
      this.updateUI()
      wx.showToast({
        title: '升级成功！',
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '金钱不足',
        icon: 'none'
      })
    }
  },

  // 保存游戏
  saveGame() {
    app.saveGame()
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  // 重新开始
  resetGame() {
    wx.showModal({
      title: '确认重置',
      content: '确定要重新开始吗？所有进度将丢失！',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          app.globalData = {
            money: 200,
            reputation: 10,
            level: 1,
            chefs: [
              { id: 1, name: '王师傅', level: 1, efficiency: 1.0, cost: 100, specialty: '川菜' },
            ],
            dishes: [
              { id: 1, name: '拍黄瓜', price: 8, level: 1, cost: 3 },
              { id: 2, name: '麻婆豆腐', price: 18, level: 1, cost: 8 },
              { id: 3, name: '宫保鸡丁', price: 28, level: 1, cost: 12 },
            ],
            decorations: {
              table: { level: 1, count: 2, cost: 150 },
              decor: { level: 1, cost: 200 },
              kitchen: { level: 1, cost: 300 },
            },
            customers: 0,
            revenue: 0,
            lastSaveTime: Date.now(),
            achievements: [],
          }
          this.updateUI()
          wx.showToast({
            title: '重新开始成功',
            icon: 'success'
          })
        }
      }
    })
  }
})
