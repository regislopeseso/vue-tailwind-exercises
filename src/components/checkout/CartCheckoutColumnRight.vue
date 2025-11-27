<script setup lang="ts">
import CartCheckoutButton from './CartCheckoutButton.vue';
import CartCancelButton from './CartCancelButton.vue';
import CartCheckoutInput from './CartCheckoutInput.vue';
import CartCheckoutCheckbox from './CartCheckoutCheckbox.vue';
import CartCheckoutCCIcon from './CartCheckoutCCIcon.vue';
import CartCheckoutSteps from './CartCheckoutSteps.vue';
</script>

<template>
  <div
    class="flex flex-col justify-center h-full col-span-7 p-16 bg-gray-800 dark:bg-gray-600"
  >
    <!-- Header -->
    <header
      class="flex flex-col items-center justify-center mb-4"
    >
      <h1
        class="animate-pulse text-start text-xl w-100 mb-10 font-extrabold uppercase"
      >
        Checkout
      </h1>

      <CartCheckoutSteps />
    </header>

    <!-- Cards -->
    <div class="flex items-center gap-4 mb-4">
      <CartCheckoutCCIcon
        class="text-white text-5xl opacity-100"
        icon="bxl:visa"
      />

      <CartCheckoutCCIcon
        class="text-3xl"
        icon="mingcute:mastercard-fill"
      />

      <CartCheckoutCCIcon
        class="text-2xl"
        icon="ic:baseline-paypal"
      />

      <CartCheckoutCCIcon
        class="text-[2.5rem]"
        icon="cib:apple-pay"
      />

      <CartCheckoutCCIcon
        class="text-[2.5rem]"
        icon="cib:google-pay"
      />
    </div>

    <!-- Form -->
    <div>
      <fieldset
        class="flex w-full gap-6 mb-5 tracking-wide"
      >
        <CartCheckoutInput
          class="w-11/12"
          label="Card Holder"
          placeholder="Please inform the name on the card"
        />

        <CartCheckoutInput
          class="w-25"
          label="Expiry Date"
          placeholder="MM/YY"
        />
      </fieldset>

      <fieldset
        class="flex w-full gap-6 mb-5 tracking-wide"
      >
        <CartCheckoutInput
          class="w-11/12"
          label="Card Number"
          placeholder="xxxx-xxxx-xxxx-xxxx"
        />

        <CartCheckoutInput
          class="w-25"
          label="CVC"
          placeholder="xxx"
        />
      </fieldset>

      <CartCheckoutCheckbox>
        Add card to wallet
      </CartCheckoutCheckbox>

      <div class="flex justify-end items-center gap-15">
        <div class="flex justify-end">
          <CartCancelButton />
        </div>

        <div class="flex justify-end">
          <CartCheckoutButton />
        </div>
      </div>
    </div>
  </div>
</template>
