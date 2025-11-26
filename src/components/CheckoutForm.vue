<script setup lang="ts">
function handleCofirmPayment() {
  alert('Payment Confirmed!');
}
</script>

<template>
  <form
    class="prose flex flex-col w-md bg-gray-900 p-10 rounded-2xl text-center"
  >
    <h1 class="text-white m-0 p-0">Checkout Form</h1>

    <hr class="p-0! m-0!" />

    <div class="flex flex-col gap-1 pb-10">
      <h3 class="text-white text-start p-0 m-0">
        Customer Details
      </h3>

      <div class="flex flex-col">
        <label class="text-start text-white" for="name"
          >Name</label
        >
        <input
          type="text"
          class="form-input rounded"
          id="name"
          placeholder="please inform your full name"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-start text-white" for="email"
          >Email</label
        >
        <input
          type="email"
          class="form-input rounded"
          id="email"
          placeholder="please inform your email address"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-start text-white" for="address"
          >Address</label
        >
        <input
          type="text"
          class="form-input rounded"
          id="address"
          placeholder="please inform your billing address"
        />
      </div>
    </div>

    <hr class="p-0! m-0!" />

    <div class="flex flex-col gap-1 pb-10">
      <h3 class="text-white text-start p-0 m-0">
        Payment Details
      </h3>

      <div class="flex flex-col">
        <label
          class="text-start text-white"
          for="cardNumber"
          >Card Number</label
        >
        <input
          type="text"
          class="form-input rounded"
          id="cardNumber"
          placeholder="xxxx-xxxx-xxxx-xxxx"
        />
      </div>

      <div class="flex flex-col">
        <label
          class="text-start text-white"
          for="expiryDate"
          >Expiry Date</label
        >
        <input
          type="date"
          class="form-input rounded"
          id="expiryDate"
          placeholder="mm / yy"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-start text-white" for="cvv"
          >CVV</label
        >
        <input
          type="text"
          class="form-input rounded"
          id="cvv"
          placeholder="xxx"
        />
      </div>
    </div>

    <hr class="p-0! m-0!" />

    <div class="flex flex-col gap-1 pb-10">
      <h3 class="text-white text-start p-0 m-0">
        Cart Details
      </h3>

      <div class="flex flex-col gap-2">
        <div class="flex">
          <span>Starter</span>
          <span>(1x)</span>
          <span>Total: $1.99</span>
        </div>

        <div class="flex">
          <span>Plus</span>
          <span>(1x)</span>
          <span>Total: $1.99</span>
        </div>

        <div class="flex">
          <span>Enterprise</span>
          <span>(1x)</span>
          <span>Total: $1.99</span>
        </div>

        <div
          class="flex flex-col justify-end items-end gap-1 mt-2"
        >
          <span>Subtotal: $5.97 </span>
          <span>TOTAL: $4.77 (20% OFF)</span>
        </div>
      </div>
    </div>

    <hr class="p-0! m-0! pb-10!" />

    <button
      type="button"
      class="bg-blue-500 rounded w-full text-white font-semibold py-2 text-sm hover:font-bold"
      @click="handleCofirmPayment"
    >
      Confirm Payment
    </button>
  </form>
</template>

<style scoped></style>
