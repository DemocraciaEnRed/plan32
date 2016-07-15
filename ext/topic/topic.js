import page from 'page'
import ToggleParent from 'democracyos-toggle-parent'
import { findForum } from '../../lib/forum-middlewares/forum-middlewares'
import forumRouter from '../../lib/forum-router/forum-router'
import { domRender } from '../../lib/render/render'
import forumTitleTemplate from './forum-title.jade'

const sidebar = document.querySelector('.nav-proposal')

page(forumRouter('/topic/:id'), findForum, (ctx, next) => {
  ctx.forumTitleView = domRender(forumTitleTemplate, {forum: ctx.forum})
  prependChild(sidebar, ctx.forumTitleView)

  var dropdownBtn = ctx.forumTitleView.querySelector('.current-department')
  new ToggleParent(dropdownBtn)
  if (ctx.forum.name === 'noticias') dropdownBtn.className = dropdownBtn.className + ' hide'
  next()
})

page.exit(forumRouter('/topic/:id'), (ctx, next) => {
  sidebar.removeChild(ctx.forumTitleView)
  delete ctx.forumTitleView
  next()
})

function prependChild (parent, newChild) {
  if (parent.firstChild) {
    parent.insertBefore(newChild, parent.firstChild)
  } else {
    parent.appendChild(newChild)
  }
}
