<template>
  <div>
    <div>
      <div class="d-flex align-items-center justify-content-center cart--header p-5">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item><router-link to="/cart">Shopping Cart</router-link></el-breadcrumb-item>
          <el-breadcrumb-item><router-link to="/check-out">Check out</router-link></el-breadcrumb-item>
          <el-breadcrumb-item><router-link to="/complete-order">Order Complete</router-link></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>