<template>
  <div>
    <Form
      v-slot="{ meta }"
      :validation-schema="simpleSchema"
      @submit="submitForm"
    >
      <div class="d-flex w-50 m-auto mb-3">
        <Field
          name="transaction_id"
          type="number"
          class="form-control"
          placeholder="Transaction ID"
        />
        <button
          type="submit"
          class="btn btn-primary mx-2"
          :disabled="!meta.valid"
        >
          Find
        </button>
      </div>
    </Form>
    <div v-if="isLoading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="transactionsList">
      <h2>Transactions</h2>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">id</th>
            <th scope="col">type</th>
            <th scope="col">institute id</th>
            <th scope="col">amount</th>
            <th scope="col">date_time_toshaparak</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(transaction, index) in transactionsListComputed"
            :key="transaction.id"
          >
            <th scope="row" v-text="index + 1" />
            <td v-text="transaction.id" />
            <td v-text="transaction.type" />
            <td v-text="transaction.institute_id" />
            <td v-text="transaction.amount" />
            <td v-text="new Date(+transaction.date_time_toshaparak * 1000)" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Form, Field } from "vee-validate";
import * as yup from "yup";
export default {
  components: {
    Form,
    Field,
  },
  data() {
    return {
      simpleSchema: {
        transaction_id: yup.number().required(),
      },
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["transactionsList"]),
    transactionsListComputed() {
      if (!Array.isArray(this.transactionsList)) {
        return [this.transactionsList];
      } else {
        return this.transactionsList;
      }
    },
  },
  methods: {
    ...mapActions(["getTransactionsList"]),
    async submitForm(form) {
      this.isLoading = true;
      try {
        await this.getTransactionsList({
          body: { transaction_id: +form.transaction_id },
        });
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
