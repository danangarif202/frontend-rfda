import { Component } from "react";
import Navbar from "../../src/components/navbar";

class User extends Component {
  state = {};
  render() {
    return (
      <>
        <Navbar />
        <div>User</div>
        <div class="overflow-visible relative max-w-sm mx-auto bg-white shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 dark:bg-slate-800 dark:highlight-white/5">
          <img class="absolute -left-6 w-24 h-24 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=80" />
          <div class="flex flex-col py-5 pl-24">
            <strong class="text-slate-900 text-sm font-medium dark:text-slate-200">Andrew Alfred</strong>
            <span class="text-slate-500 text-sm font-medium dark:text-slate-400">Technical advisor</span>
          </div>
        </div>
      </>
    );
  }
}

export default User;
