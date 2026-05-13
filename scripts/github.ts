/* eslint-disable no-console */
import 'dotenv/config'
import { simpleGit } from 'simple-git'
import { storeJsonFile } from './helper'

const main = async () => {
  try {
    const git = simpleGit(process.cwd())

    const { latest } = await git.tags()
    const branch = await git.revparse(['--abbrev-ref', 'HEAD'])
    const tag = process.env.GIT_TAG || latest || 'unreleased'
    const gitTagLink =
      process.env.GIT_TAG || latest
        ? `https://github.com/InjectiveLabs/pdaas/releases/tag/${tag}`
        : 'https://github.com/InjectiveLabs/pdaas'

    if (process.env.GIT_TAG) {
      storeJsonFile('app/json/gitVersion.json', {
        branch,
        gitTagLink,
        tag,
        logs: []
      })

      return
    }

    const { all } = await git.log(
      latest ? { from: latest, to: 'HEAD' } : { maxCount: 20 }
    )

    const logs = all.map((log: any) => ({
      ...log,
      commitLink: `https://github.com/InjectiveLabs/pdaas/commit/${log.hash}`
    }))

    storeJsonFile('app/json/gitVersion.json', {
      branch,
      tag,
      gitTagLink,
      logs
    })

    console.log('✅✅✅ Github version')
  } catch (err) {
    console.error('❌❌❌ Github version')
    throw err
  }
}

main()
