<template>
  <div class="sm:flex sm:items-center ml-2 mb-2">
    <div class="sm:flex-auto">
      <ContentHeading :heading="header" />
    </div>
    <a href="/admin/add" class="primaryButton">Manual Add Headlin3</a> 
    <a href="/admin/add" class="primaryButton ml-3">Run Batch</a>
  </div>

  <div v-if="showEdit">
    <EditLink :id = "editId" />
  </div>

  <div v-if="!showEdit" class="mt-10 ml-5">
    <dt>SORT HEADLIN3S:</dt>
    <dd class="sm:col-span-2">
      <div class="flex-grow">
        <select id="selected-tab" 
        name="selected-tab" 
        @change="handleSort($event)"
        v-model="sortChoice" class="formInput sm:text-sm">
          <option v-for="sort in adminSortList" :key="sort">
            {{ sort }}
          </option>
        </select>
      </div>
    </dd>
  </div>

  <div class="overflow-x-auto inline-block px-5 align-middle">
    <table id="adminTable" class="divide-y divide-gray-400 dark:divide-gray-700 ml-2">
      <thead>
        <tr>
          <th scope="col" class="text-xs font-semibold">
            <span class="sr-only">Edit</span>
          </th>
          <th scope="col"><span class="sr-only">Delete</span></th>
          <th scope="col" class="text-xs">ID</th>
          <th scope="col" class="text-sm font-semibold">Name</th>
          <th scope="col" class="text-sm font-semibold">Description</th>
        </tr>
      </thead>

      <tbody class="divide-y divide-gray-300 dark:divide-gray-800">
        <tr v-for="link in theLinks" :key="theLinks._id">
          <td class="text-xs font-semibold cursor-pointer">
            <a @click="handleEdit(link._id)">Edit</a>
          </td>
          <td class="relative py-4 pl-3 pr-4 text-right text-xs font-semibold">
            <a @click="handleDelete(link._id)" class="cursor-pointer">Delete</a>
          </td>
          <td class="text-xs">{{ link._id }}</td>
          <td class="text-sm  font-semibold">
            <a :href="link.url" 
              class="dark:text-white text-black hover:text-orange-500 dark:hover:text-orange-500"
              target="_blank">
                {{ link.name }}
            </a>
          </td>
          <td class="text-sm">{{ link.desc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup>
import Swal from 'sweetalert2';
import ContentHeading from '../../components/shared/ContentHeading.vue'
import EditLink from "./EditLink.vue";
import { adminSortList } from "../../js/adminSort.js";
import { token } from "../../js/test.js";
import selectSort from "../../js/sort.js";
import { ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'

let editId = ref("");
const showEdit = ref(false);
const router = useRouter()
const theLinks = ref({})
const sortChoice = ref(adminSortList[0]);
let sortedUrl = ''

const header = {
  header: "Headlin3 Admin",
  subHeader: "This is the headlin3s management section.  Navigate via url path.",
}

const handleSort = async (e) => {
  sortedUrl = selectSort(e.target.value);
  console.log(sortedUrl);

  try {
    const response = await fetch(sortedUrl);
    const data = await response.json();
    if (data.count != 0) {
      theLinks.value = data.data;
    }
  } catch (err) {
    console.log(err);
  }

  };

const getLinks = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/links/?limit=100&select=id,name,desc,url`);
    const data = await response.json();
    if (data.count != 0) {
      theLinks.value = data.data;
    }
  } catch (err) {
    console.log(err);
  }
}

const handleEdit = async (id) => {
  showEdit.value = false;
  editId.value = "";
  console.log(`You are editing record: ${id}`);
  editId.value = id;
  showEdit.value = true;
  // router.push(`/admin/edit/${id}`);
}

const handleDelete = async (id) => {
  console.log(`deleting ${id}`);

  const headers = {
    Accept: "application/json",
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`, 
  }

  const url = `http://localhost:5000/api/v1/links/${id}`;

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: headers,
        });
        const data = await response.json();
        if (data) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          await getLinks().then(() => {
            console.log('done getting news links');
          });
        } else {
          Swal.fire(
            'Error!',
            'Your file has not been deleted.',
            'error'
          )
        }
      } catch (err) {
        console.log(err);
      }
    }
  })
}

onMounted(async () => {
  if (token != null) {
    await getLinks().then(() => {
      console.log('getLinks() done');
    });
  }
});

</script>
