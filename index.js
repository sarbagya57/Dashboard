const table = document.getElementById("employeeList");
let employeeList;

function openForm() {
  document.querySelector("body").style.overflow = "hidden";
  document.getElementById("popupForm").style.display = "block";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
  document.querySelector("body").style.overflow = "auto";
  clearField();
}

// function to vaidate form

function validateForm() {
  const employeeName = document.getElementById("employeeName").value;
  const country = document.getElementById("country").value;
  const type = document.getElementById("type").value;
  const paidDays = document.getElementById("paidDays").value;
  const timeOff = document.getElementById("timeOff").value;
  const netPay = document.getElementById("netPay").value;

  if (employeeName == "") {
    document.getElementById("validEmployeeName").innerHTML =
      "Please enter Employee Name";
    return false;
  }
  if (country == "") {
    document.getElementById("validCountry").innerHTML =
      "Please enter Country Name";
    return false;
  }
  if (type == "") {
    document.getElementById("validType").innerHTML =
      "Please enter Employee Type";
    return false;
  }
  if (paidDays == "") {
    document.getElementById("validPaidDays").innerHTML =
      "Please enter Paid Days";
    return false;
  }
  if (timeOff == "") {
    document.getElementById("validTimeOff").innerHTML = "Please enter Time Off";
    return false;
  }
  if (netPay == "") {
    document.getElementById("validNetPay").innerHTML = "Please enter Net Pay";
    return false;
  }
  return true;
}

// Function to show data in the table

function showData() {
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  let html = "";

  employeeList.forEach(function (element, index) {
    html +=
      `<tr class="table__row">
      <td class=table__data> 
        <div class="table__column">
          <h4 class="table__name"> ${element.employeeName} </h4>
          <div class="table__details">
            <img src= />
            <span> ${element.country} </span>
        </div>
      </td>
      <td class="table__data"> ${element.type} </td>
      <td class="table__data"> ${element.paidDays} Days </td>
      <td class="table__data"> ${element.timeOff} Days </td>
      <td class="table__data">  ${element.netPay} </td>
      <td class="table__data"> 
        <div class="table-btn">
          <button onclick="updateData(` +
      index +
      `)" class= "btn">
      <img src="/assets/edit-icon.png" alt="edit-icon" />

          </button>
          <button onclick="deleteData(` +
      index +
      `)" class= "btn">
      <img src="/assets/delete-icon.png" alt="del-icon" />

          </button> 
        </div>
      </td> 
    </tr>`;
  });

  document.querySelector("tbody").innerHTML = html;
}

// Load all data when page loaded

document.onload = showData();

// Function to add data in the table

function addData() {
  openForm();
  document.getElementById("Submit").style.display = "block";
  document.getElementById("Update").style.display = "none";

  let employeeList;
  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
  }

  document.querySelector("#Submit").onclick = function () {
    if (validateForm()) {
      const employeeName = document.getElementById("employeeName").value;
      const country = document.getElementById("country").value;
      const type = document.getElementById("type").value;
      const paidDays = document.getElementById("paidDays").value;
      const timeOff = document.getElementById("timeOff").value;
      const netPay = document.getElementById("netPay").value;

      employeeList.push({
        employeeName: employeeName,
        country: country,
        type: type,
        paidDays: paidDays,
        timeOff: timeOff,
        netPay: netPay,
      });

      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      showData();
      document.getElementById("employeeName").value = " ";
      document.getElementById("country").value = " ";
      document.getElementById("type").value = " ";
      document.getElementById("paidDays").value = " ";
      document.getElementById("timeOff").value = " ";
      document.getElementById("netPay").value = " ";

      closeForm();
      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
      location.reload();
    } else {
      return false;
    }
  };
}

// Function to update data from table

function updateData(index) {
  openForm();
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";

  if (localStorage.getItem("employeeList") == null) {
    employeeList = [];
  } else {
    employeeList = JSON.parse(localStorage.getItem("employeeList"));
    showData();
  }

  document.getElementById("employeeName").value =
    employeeList[index].employeeName;
  document.getElementById("country").value = employeeList[index].country;
  document.getElementById("type").value = employeeList[index].type;
  document.getElementById("paidDays").value = employeeList[index].paidDays;
  document.getElementById("timeOff").value = employeeList[index].timeOff;
  document.getElementById("netPay").value = employeeList[index].netPay;

  document.querySelector("#Update").onclick = function () {
    if (validateForm()) {
      employeeList[index].employeeName =
        document.getElementById("employeeName").value;
      employeeList[index].country = document.getElementById("country").value;
      employeeList[index].type = document.getElementById("type").value;
      employeeList[index].paidDays = document.getElementById("paidDays").value;
      employeeList[index].timeOff = document.getElementById("timeOff").value;
      employeeList[index].netPay = document.getElementById("netPay").value;

      localStorage.setItem("employeeList", JSON.stringify(employeeList));
      showData();
      document.getElementById("employeeName").value = " ";
      document.getElementById("country").value = " ";
      document.getElementById("type").value = " ";
      document.getElementById("paidDays").value = " ";
      document.getElementById("timeOff").value = " ";
      document.getElementById("netPay").value = " ";

      closeForm();
      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
      location.reload();
    } else {
      return false;
    }
  };
}

// Function to delete data from table

function deleteData(index) {
  let confirm = window.confirm("Are you sure you want to delete this item");

  if (confirm === true) {
    if (localStorage.getItem("employeeList") == null) {
      employeeList = [];
    } else {
      employeeList = JSON.parse(localStorage.getItem("employeeList"));
      showData();
    }
    employeeList.splice(index, 1);
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    showData();
    closeForm();
    location.reload();
  } else {
    return false;
  }
}

// Function for total paid days

function totalPaidDays() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  let paid = employees.map((employe) => employe.paidDays);
  paid = paid.map(Number);
  const totalPaid = paid.reduce(function (days, index) {
    return days + index;
  });
  document.getElementById("footer-paid").innerHTML = totalPaid + " Days";
  console.log(totalPaid);
}

totalPaidDays();

// Function for total paid days

function totalTimeOff() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  let time = employees.map((employe) => employe.timeOff);
  time = time.map(Number);
  const totalTime = time.reduce(function (days, index) {
    return days + index;
  });
  document.getElementById("footer-timeOff").innerHTML = totalTime + " Days";
  console.log(totalTime);
}

totalTimeOff();

// Function for calculating total net pay

function totalNetPay() {
  const employees = JSON.parse(localStorage.getItem("employeeList"));
  console.log(employees);
  let net = employees.map((employe) => employe.netPay);
  net = net.map(Number);
  const totalNet = net.reduce(function (n, index) {
    return n + index;
  });
  document.getElementById("total").innerHTML = "$ " + totalNet;
  document.getElementById("footer-total").innerHTML = "$ " + totalNet;
  console.log(totalNet);
}

totalNetPay();

function clearField() {
  document.getElementById("employeeName").value = " ";
  document.getElementById("country").value = " ";
  document.getElementById("type").value = " ";
  document.getElementById("paidDays").value = " ";
  document.getElementById("timeOff").value = " ";
  document.getElementById("netPay").value = " ";
}
